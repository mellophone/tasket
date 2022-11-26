class DBService {
  static isSignedIn = async (): Promise<boolean> => {
    if (!sessionStorage.getItem("token")) {
      return false;
    }
    const request = await fetch("http://localhost:5000/users/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const response = await request.json();
    // console.log(JSON.stringify(response));
    if (!!response.error) {
      return false;
    }
    return true;
  };

  static getUser = async () => {
    const request = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return await request.json();
  };
}

export default DBService;
