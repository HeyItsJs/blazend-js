import { FetchJSONResponse, postJSON } from "./utils";

export class API {
  private url: string = "/";
  constructor(origin: string) {
    if (!origin.endsWith("/")) {
      origin = origin + "/";
    }
    this.url = origin;
  }

  call<T>(serviceName: string, funcName: string, params: any = {}): Promise<FetchJSONResponse<T>> {
    const url = `${this.url}v1/api/services/${serviceName}/${funcName}`;
    return postJSON(url, params);
  }
}
