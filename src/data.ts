import { Product } from "./types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Algodão",
    price: 49.9,
    description: "Camiseta 100% algodão, confortável e durável. Ideal para o dia a dia.",
    categories: ["Camisetas"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Preto", "Cinza", "Azul Marinho"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "2",
    name: "Calça Jeans Slim",
    price: 159.9,
    description: "Calça jeans com modelagem slim, elastano para maior conforto e lavagem clássica.",
    categories: ["Calças"],
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Azul Claro", "Azul Escuro", "Preto"],
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "3",
    name: "Casaco Moletom Canguru",
    price: 189.9,
    description: "Moletom flanelado com capuz e bolso canguru. Perfeito para os dias mais frios.",
    categories: ["Casacos", "Inverno"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza Mescla", "Bordô"],
    images: ["https://images.unsplash.com/photo-1614838561117-640a4542cfbd?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "4",
    name: "Jaqueta Corta Vento",
    price: 229.9,
    description: "Jaqueta leve resistente à água e ao vento. Ótima para atividades ao ar livre.",
    categories: ["Casacos", "Esportes"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Verde Musgo", "Amarelo"],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "5",
    name: "Camisa Social Manga Longa",
    price: 129.9,
    description: "Camisa social em tricoline, modelagem comfort. Ideal para o trabalho.",
    categories: ["Camisas"],
    sizes: ["1", "2", "3", "4", "5"],
    colors: ["Branco", "Azul Claro", "Preto"],
    images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "6",
    name: "Bermuda Chino",
    price: 99.9,
    description: "Bermuda de sarja com corte alfaiataria. Elegância e conforto para o calor.",
    categories: ["Bermudas", "Calças"], // Grouping bermudas near pants
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Bege", "Azul Marinho", "Preto", "Verde Oliva"],
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "7",
    name: "Vestido Midi Estampado",
    price: 179.9,
    description: "Vestido midi em viscose, caimento leve e confortável com estampa floral exclusiva.",
    categories: ["Vestidos"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Floral Azul", "Floral Vermelho", "Preto"],
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "8",
    name: "Camiseta Estampada Vintage",
    price: 59.9,
    description: "Camiseta de algodão com estampa com pegada retrô e lavagem estonada.",
    categories: ["Camisetas"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto Estonado", "Vinho Estonado", "Chumbo"],
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"]
  }
];
