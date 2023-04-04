export type Stock = { name: string; itemsLeft: number; _id: string };

export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type productType = {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  inStock: Stock[];
  rating: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
};

export type orderType = {
  address: string,
  isPaymentAccept: boolean,
  isDelivered: boolean,
  totalPrice: number
  products: productType[]
}

export type cartItem = {
  id: string,
  name: string,
  photoUrl: string,
  category: Category,
  count: number
  price: number
  size: string
}