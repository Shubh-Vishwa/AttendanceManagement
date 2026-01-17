import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";


export default function Attendance() {
const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
API.get("/attendance")
.then(res => setRecords(res.data))
.finally(() => setLoading(false));
}, []);


if (loading) return <Loader />;


return (
<div style={{ padding: 40 }}>
<h2>Attendance</h2>
{records.map(rec => (
<div key={rec.id}>
Employee #{rec.employee_id} – {rec.status}
</div>
))}
</div>
);
}