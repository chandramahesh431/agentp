import Axios from "axios";
// import { toast } from "react-toastify";

// Axios.defaults.headers.common["x-auth-token"] = authService.getJwtToken();
Axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("logging the error", error);
    // toast.error("Something happened unexpected error ....");
    console.log("Something happened unexpected error ....");
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setJwt
};
