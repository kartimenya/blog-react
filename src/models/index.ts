export interface ILogin {
  email: string;
  password: string;
}

export interface IRegist {
  userName: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  _id: string;
  email: string;
  userName: string;
}

export interface IPost {
  _id: string;
  title: string;
  text: string;
  viewCount: number;
  user: IUser;
  imageUrl?: string;
}
