import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://dummyjson.com";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/products");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "/products", { headers: authHeader() });
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
