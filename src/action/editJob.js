import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export default async function addJobs({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/job/${params.id}`, data);
    toast.success("Job edit successfully!");
    return redirect("/dashboard/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
