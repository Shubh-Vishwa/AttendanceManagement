import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
const navigate = useNavigate();


const logout = () => {
localStorage.removeItem("token");
navigate("/");
};


return (
<nav style={{ padding: 16, background: "#222", color: "white" }}>
<Link to="/dashboard" style={{ marginRight: 15 }}>Dashboard</Link>
<Link to="/employees" style={{ marginRight: 15 }}>Employees</Link>
<Link to="/attendance" style={{ marginRight: 15 }}>Attendance</Link>
<button onClick={logout}>Logout</button>
</nav>
);
}