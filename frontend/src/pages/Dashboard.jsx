import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:8000/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg text-gray-500">Employees</h3>
          <p className="text-4xl font-bold mt-2 text-indigo-600">
            {stats.employees}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg text-gray-500">Present Today</h3>
          <p className="text-4xl font-bold mt-2 text-green-600">
            {stats.present}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg text-gray-500">Absent</h3>
          <p className="text-4xl font-bold mt-2 text-red-600">
            {stats.absent}
          </p>
        </div>
      </div>
    </Layout>
  );
}
