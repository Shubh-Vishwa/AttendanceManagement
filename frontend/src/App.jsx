import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";


export default function App() {
const isLoggedIn = localStorage.getItem("token");


return (
<>
{isLoggedIn && <Navbar />}
<Routes>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
<Route path="/employees" element={isLoggedIn ? <Employees /> : <Navigate to="/" />} />
<Route path="/attendance" element={isLoggedIn ? <Attendance /> : <Navigate to="/" />} />
</Routes>
</>
);
}