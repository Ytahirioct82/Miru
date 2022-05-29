import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.replace(`/activity/registration`);
      }
    }
    return Promise.reject(error.response.data);
  }
);
