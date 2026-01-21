export interface IOrder {
  _id?: string;
  customerName: string;
  address: string;
  phone: string;
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  createdAt: Date;
}
