// /////////////////////////////refresh access token //////////////////////////////
interface IGetTokenReq {
  refreshToken: string;
}

interface IGetTokenRes {
  status: string;
  token: {
    accessToken: string;
  };
}

// //////////////////////////////////login /////////////////////////////////////
export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginRes {
  status: string;
  token: IToken;
  data: IData;
}
interface IToken {
  accessToken: string;
  refreshToken: string;
}
interface IData {
  user: IUser;
}
interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

// //////////////////////////////////signup /////////////////////////////////////
export interface ISignupReq {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface ISignupRes {
  status: string;
  token: Token;
  data: Data;
}
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface Data {
  user: User;
}
export interface User {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}
