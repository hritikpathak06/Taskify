import axios from "axios";
import { BASE_URL } from "./url";

export const getAllTasks = async (page?: any) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/task/get-tasks?page=${page}`, {
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
