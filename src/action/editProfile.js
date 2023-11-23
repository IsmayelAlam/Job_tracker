import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export default async function editProfile({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/user/update-user`, data);
    toast.success("Profile edit successfully!");
    return redirect("/dashboard/profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
