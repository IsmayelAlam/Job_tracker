import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

export default async function loader() {
  try {
    const { data } = await customFetch("/user/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
}
