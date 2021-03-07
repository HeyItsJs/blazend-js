import { FetchJSONResponse, postJSON } from "./utils";

export class API {
  private url: string = "/";
  private options: any = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  constructor(origin: string) {
    if (!origin.endsWith("/")) {
      origin = origin + "/";
    }
    this.url = origin;
  }

  setToken(token: string) {
    this.options.headers.Authorization = `Bearer ${token}`;
  }

  call<T>(serviceName: string, funcName: string, params: any = {}): Promise<FetchJSONResponse<T>> {
    const url = `${this.url}v1/api/services/${serviceName}/${funcName}`;
    const options = Object.assign({}, this.options, { method: "POST", body: JSON.stringify(params) });
    return postJSON(url, options);
  }
}
