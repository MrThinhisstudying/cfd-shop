import axiosInstance from "../utils/axiosInstance";

export const pageService = {
  getPage(query = "") {
    return axiosInstance.get(`/pages${query}`);
  },
  getPageDataByName(name = "") {
    return axiosInstance.get(`/pages/${name}`);
  },
};
