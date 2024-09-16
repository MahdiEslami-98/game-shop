// /////////////////////////////add order ////////////////////////////////
interface IAddOrderProduct {
  product: string;
  count: number;
}
export interface IAddOrderReq {
  user: string;
  products: IAddOrderProduct[];
  deliveryStatus: boolean;
  deliveryDate: string;
}

interface IAddOrderResProductEntity {
  product: {
    _id: string;
    price: number;
  };
  count: number;
  _id: string;
}

interface IAddOrderRes {
  status: string;
  data: {
    order: {
      user: string;
      products: IAddOrderResProductEntity[];
      totalPrice: number;
      deliveryDat: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

// /////////////////////////////edit order ////////////////////////////////
interface IEditOrderProduct {
  product: string;
  count: number;
}
export interface IEditOrderReq {
  products?: IAddOrderProduct[];
  deliveryStatus?: boolean;
  deliveryDate?: string;
}

export interface IEditOrderRes {
  status: string;
  data: Data;
}
interface Data {
  order: Order;
}
interface Order {
  _id: string;
  user: User;
  products?: ProductsEntity[] | null;
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface ProductsEntity {
  product: Product;
  count: number;
  _id: string;
}
interface Product {
  rating: Rating;
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
interface Rating {
  rate: number;
  count: number;
}

// ///////////////////////////get orders ////////////////////////////////
export interface IOrders {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IDataOrder;
}
export interface IDataOrder {
  orders: IOrdersEntity[] | [];
}
export interface IOrdersEntity {
  _id: string;
  user: string;
  products: IProductsEntity[] | [];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IProductsEntity {
  product: string;
  count: number;
  _id: string;
}

// ///////////////////////////get order by id ////////////////////////////////
interface IOrderProductEntity {
  product: {
    rating: {
      rate: number;
      count: number;
    };
    _id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  count: number;
  _id: string;
}

export interface IGetOrderByIdRes {
  status: string;
  data: {
    order: {
      _id: string;
      user: {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        phoneNumber: string;
        address: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      products: IOrderProductEntity[];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: false;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
