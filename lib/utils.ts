import nodeFetch from "node-fetch";
import qs from "qs";

const fetch = nodeFetch;

export interface FetchJSONResponse<T> {
  status: number;
  data: T;
}

export function fetchJSON<T>(
  url: string,
  options: any,
  logPerformanceMetrics?: boolean,
): Promise<FetchJSONResponse<T>> {
  const requestTime = logPerformanceMetrics ? new Date().getTime() : 0;
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        const status = response.status;
        response
          .json()
          .then(({ result, execTime }) => {
            if (logPerformanceMetrics) {
              const responseTime = new Date().getTime();
              const totalTime = responseTime - requestTime;
              const networkLatency = totalTime - execTime;
              console.log(
                "Request",
                url,
                "Total Time",
                totalTime,
                "Backend Execution Time",
                execTime,
                "Network Latency",
                networkLatency,
              );
            }
            resolve({ status: status, data: result });
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

export function postJSON<T>(
  url: string,
  options: any,
  params: any,
  logPerformanceMetrics: boolean,
): Promise<FetchJSONResponse<T>> {
  const finalOptions = Object.assign({}, options, { method: "POST", body: JSON.stringify(params) });
  return fetchJSON(url, finalOptions, logPerformanceMetrics);
}

export function getJSON<T>(
  url: string,
  options: any,
  params: any,
  logPerformanceMetrics: boolean,
): Promise<FetchJSONResponse<T>> {
  const queryString = qs.stringify(params);
  const finalUrl = `${url}?${queryString}`;
  const finalOptions = Object.assign({}, options, { method: "GET" });
  return fetchJSON(finalUrl, finalOptions, logPerformanceMetrics);
}
