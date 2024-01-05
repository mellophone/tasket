import { backendUrl } from "./constants";

export default class Backend {
  private static makeRequest = async (
    path: string,
    method: "GET" | "POST" | "PATCH",
    body?: string
  ) => {
    const response = await fetch(`${backendUrl}${path}`, {
      method,
      body,
      credentials: "include",
    });

    return response;
  };

  public static signup = async (email: string, password: string) => {
    const body = JSON.stringify({
      email,
      password,
    });

    const signupResponse = await this.makeRequest("/user", "POST", body);

    return await signupResponse.json();
  };

  public static login = async (email: string, password: string) => {
    const body = JSON.stringify({
      email,
      password,
    });

    const loginResponse = await this.makeRequest("/user/login", "POST", body);

    return await loginResponse.json();
  };

  public static getUser = async () => {
    const userResponse = await this.makeRequest("/user", "GET");

    return await userResponse.json();
  };
}
