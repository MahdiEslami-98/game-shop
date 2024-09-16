// //////////////////////////get category by id /////////////////////////////
export interface ICategoryByIdRes {
  status: string;
  data: {
    category: {
      _id: string;
      name: string;
      icon: string;
      createdAt: string;
      updatedAt: string;
      slugname: string;
      __v: number;
    };
  };
}

// ////////////////////////get all category /////////////////////////////
export interface ICategory {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ICategoryData;
}

export interface ICategoryData {
  categories: ICategoryEntity[];
}

export interface ICategoryEntity {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
