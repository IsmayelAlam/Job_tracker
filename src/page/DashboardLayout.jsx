import { Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
