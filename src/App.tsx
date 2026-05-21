/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { UserOrders } from './pages/UserOrders';

import { CheckoutSuccess, CheckoutCancel } from './pages/StripeResult';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] flex flex-col font-sans">
          <Header />
          <main className="flex-1 flex flex-col items-center w-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/produto/:id" element={<ProductPage />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/sucesso" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancela" element={<CheckoutCancel />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pedidos" element={<UserOrders />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
