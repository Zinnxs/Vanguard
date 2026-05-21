import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Route for Stripe Checkout
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(500).json({ error: "Chave STRIPE_SECRET_KEY não configurada." });
      }

      // @ts-ignore
      const stripe = new Stripe(stripeKey);
      const { cart, customer } = req.body;
      
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      const lineItems = cart.map((item: any) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: `${item.product.name} (${item.color} - ${item.size})`,
            images: [item.product.images[0]],
          },
          unit_amount: Math.round(item.product.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      }));

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${appUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout/cancela`,
        customer_email: customer?.email,
        metadata: {
          customerName: customer?.name,
          customerCpf: customer?.cpf,
        }
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
