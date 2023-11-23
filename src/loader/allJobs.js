import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export default async function loader({ request }) {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/job", { params });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
