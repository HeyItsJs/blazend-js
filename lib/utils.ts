import nodeFetch from "node-fetch";

const fetch = nodeFetch;

export interface FetchJSONResponse<T> {
  status: number;
  data: T;
}

export function fetchJSON<T>(url: string, options: any, logPerformanceMetrics: boolean): Promise<FetchJSONResponse<T>> {
  const requestTime = logPerformanceMetrics ? new Date().getTime() : 0;
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        const status = response.status;
        response
          .json()
          .then((data) => {
            if (logPerformanceMetrics) {
              const responseTime = new Date().getTime();
              const totalTime = responseTime - requestTime;
              const backendExecutionTime = Number(response.headers.get("EXEC_TIME"));
              const networkLatency = totalTime - backendExecutionTime;
              console.log(
                "Request",
                url,
                "Total Time",
                totalTime,
                "Backend Execution Time",
                backendExecutionTime,
                "Network Latency",
                networkLatency,
              );
            }
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

export function postJSON<T>(url: string, options: any, logPerformanceMetrics: boolean): Promise<FetchJSONResponse<T>> {
  return fetchJSON(url, options, logPerformanceMetrics);
}
