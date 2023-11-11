import { Link } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/dashboard">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link> layout
    </div>
  );
}
