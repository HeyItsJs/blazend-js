import fetch from "node-fetch";

export interface FetchJSONResponse<T> {
  status: number;
  data: T;
}

export function fetchJSON<T>(url: string, method: string, body?: any): Promise<FetchJSONResponse<T>> {
  return new Promise((resolve, reject) => {
    const options: any = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    fetch(url, options)
      .then((response) => {
        const status = response.status;
        response
          .json()
          .then((data) => {
            resolve({ status: status, data: data });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function postJSON<T>(url: string, body: any): Promise<FetchJSONResponse<T>> {
  return fetchJSON(url, "POST", body);
}
