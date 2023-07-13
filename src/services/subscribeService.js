import axiosInstance from "../utils/axiosInstance";

export const subcribeService = {
  subscribe(query = "") {
    return axiosInstance.get(`/subscribes${query}`);
  },
  subscribeDeal(email = "") {
    return axiosInstance.post(`/subscribes/deals`, email);
  },
};
