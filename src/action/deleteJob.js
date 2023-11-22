import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export default async function deleteJob({ params }) {
  try {
    await customFetch.delete(`/job/${params.id}`);
    toast.success("Job deleted successfully!");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
