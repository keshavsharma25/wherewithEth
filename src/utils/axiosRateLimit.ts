import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Bottleneck from "bottleneck";

let inProgress = 0;

// const rateLimitedAxios = async (
//   config: AxiosRequestConfig
// ): Promise<AxiosResponse> => {
//   return new Promise((resolve, reject) => {
//     if (inProgress >= 10) {
//       setTimeout(() => {
//         rateLimitedAxios(config).then(resolve).catch(reject);
//       }, 0.0001);
//     } else {
//       inProgress++;
//       axios(config)
//         .then((response) => {
//           inProgress--;
//           resolve(response);
//         })
//         .catch((error) => {
//           inProgress--;
//           reject(error);
//         });
//     }
//   });
// };

const limiter = new Bottleneck({
  maxConcurrent: 7,
  minTime: 0.01,
});

const rateLimitedAxios = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return limiter.schedule(() => axios(config));
};

export default rateLimitedAxios;
