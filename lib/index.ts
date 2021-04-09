import { FetchJSONResponse, getJSON, postJSON } from "./utils";

export enum FuncType {
  Post = "POST",
  Get = "GET",
}

export class API {
  private url: string = "/";
  private logPerformanceMetrics: boolean;
  private options: any = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  constructor(origin: string, logPerformanceMetrics: boolean) {
    if (!origin.endsWith("/")) {
      origin = origin + "/";
    }
    this.url = origin;
    this.logPerformanceMetrics = logPerformanceMetrics;
  }

  setToken(token: string) {
    this.options.headers.Authorization = `Bearer ${token}`;
  }

  call<T>(serviceName: string, funcName: string, funcType: FuncType, params: any = {}): Promise<FetchJSONResponse<T>> {
    const url = `${this.url}v1/api/services/${serviceName}/${funcName}`;
    if (funcType === FuncType.Get) {
      return getJSON(url, this.options, params, this.logPerformanceMetrics);
    }
    return postJSON(url, this.options, params, this.logPerformanceMetrics);
  }
}
