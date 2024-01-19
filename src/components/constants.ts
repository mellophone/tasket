import { createContext } from "react";

export const backendUrl = `${process.env.BACKEND_URL}`;

export const UserContext = createContext<UserData>({} as UserData);

export type UserData = {
  _id: string;
  email: string;
  settings: {};
  groups: {
    [name: string]: any;
  };
};
