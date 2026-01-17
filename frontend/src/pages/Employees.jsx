import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://127.0.0.1:8000/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmployees(res.data);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-3">{emp.name}</td>
              <td className="p-3">{emp.email}</td>
              <td className="p-3 capitalize">{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
