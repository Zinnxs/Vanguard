export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  sizes: string[];
  colors: string[];
  images: string[];
}

export interface CartItem {
  cartItemId: string; // unique id for cart item (product.id + size + color)
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    cpf: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  status: string;
  paymentMethod: string;
}
