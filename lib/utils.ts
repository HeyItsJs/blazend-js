import nodeFetch from "node-fetch";

const fetch = nodeFetch;

export interface FetchJSONResponse<T> {
  status: number;
  data: T;
}

export function fetchJSON<T>(url: string, options: any): Promise<FetchJSONResponse<T>> {
  return new Promise((resolve, reject) => {
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

export function postJSON<T>(url: string, options: any): Promise<FetchJSONResponse<T>> {
  return fetchJSON(url, options);
}
