interface request {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint: `/${string}`;
  req: {
    query: Object | undefined;
    body: Object | undefined;
  };
}

const colors = {
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  none: "\x1B[0m",
};

class LogManager {
  static logRequest = (userRequest: request) => {
    console.log(
      `[${colors.blue}REQ${colors.none}] ~ ${this.getTimestamp()}\n${
        userRequest.method
      } "${userRequest.endpoint}"\n${
        userRequest.method === "GET" ? "Query" : "Body"
      }: ${
        userRequest.method === "GET"
          ? JSON.stringify(userRequest.req.query)
          : JSON.stringify(userRequest.req.body)
      }\n\n`
    );
  };

  static logResponse = (databaseResponse: Object) => {
    console.log(
      `[${colors.green}RES${
        colors.none
      }] ~ ${this.getTimestamp()}\n${JSON.stringify(
        databaseResponse,
        null,
        1
      )}\n\n`
    );
  };

  static logAuth = (rawToken: Object) => {
    console.log(
      `[${colors.yellow}AUTH${
        colors.none
      }] ~ ${this.getTimestamp()}\nToken: ${JSON.stringify(rawToken)}\n\n`
    );
  };

  static logError = (
    errorMessage: string,
    location: `${string}.ts > ${string}()`
  ) => {
    console.log(
      `[${colors.red}ERR${
        colors.none
      }] ~ ${this.getTimestamp()}\n${location}\nError: ${errorMessage}\n\n`
    );
  };

  static getTimestamp = () =>
    `${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`;
}

export default LogManager;
