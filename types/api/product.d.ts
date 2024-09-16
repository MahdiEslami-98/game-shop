// //////////////////////////////add products ////////////////////////////////
export interface IAddProduct {
  status: string;
  data: Data;
}
export interface Data {
  product: Product;
}
export interface Product {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images?: string[] | null;
  rating: Rating;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
export interface Rating {
  rate: number;
  count: number;
}

// //////////////////////////////get products //////////////////////////////
export interface IProductsRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IDataProducs;
}
interface IDataProducs {
  products?: ProductsEntity[] | null;
}
interface ProductsEntity {
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
  images: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
interface Rating {
  rate: number;
  count: number;
}

// /////////////////////////////get product by id ////////////////////////////
export interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
  category: {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  subcategory: {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  _id: string;
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
}

export interface IProductByIdRes {
  status: string;
  data: {
    product: IProduct;
  };
}

// /////////////////////////////remove product //////////////////////////
export interface IDeleteProductRes {
  status: string;
  data: {
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
  };
}

// /////////////////////////////edit product //////////////////////////

export interface IEditProductRes {
  status: string;
  data: Data;
}
export interface Data {
  product: Product;
}
export interface Product {
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
export interface Rating {
  rate: number;
  count: number;
}

// //////////////////////edit product price and quantity ////////////////////
export interface IEditProductPriceAndQuantityData {
  id: string;
  price?: string;
  quantity?: string;
}

export interface IEditPriceAndQuantityRes {
  status: string;
  data: {
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
  };
}
