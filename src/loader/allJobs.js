import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export default async function loader() {
  try {
    const { data } = await customFetch("/job");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
