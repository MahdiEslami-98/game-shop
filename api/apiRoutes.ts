const apiRoutes = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    logout: "/auth/logout",
    newAccessToken: "/auth/token",
  },
  users: "/users",
  products: "/products",
  orders: "/orders",
  categories: "/categories",
  subcategories: "/subcategories",
  productImg: `${process.env.NEXT_PUBLIC_BASE_URL}/images/products/images/`,
  productThumb: `${process.env.NEXT_PUBLIC_BASE_URL}/images/products/thumbnails/`,
  categoryIcon: `${process.env.NEXT_PUBLIC_BASE_URL}/images/categories/icons/`,
};

Object.freeze(apiRoutes);

export default apiRoutes;
