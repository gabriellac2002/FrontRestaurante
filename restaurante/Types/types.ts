export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: File;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
  isAdmin: boolean;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  userAdress: string;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};
