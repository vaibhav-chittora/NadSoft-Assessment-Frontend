import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", rollNumber: "" });

    useEffect(() => {
        async function fetchStudent() {
            try {
                const res = await API.get(`/students/${id}`);
                setFormData({
                    name: res.data?.data?.name || "",
                    rollNumber: res.data?.data?.rollNumber || "",
                });
            } catch (error) {
                console.error("Fetch error:", error);
                Swal.fire("Error", "Failed to fetch student data", "error");
            }
        }
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.rollNumber) {
            return Swal.fire("Validation Error", "All fields are required.", "warning");
        }

        try {
            await API.put(`/students/${id}`, formData);
            Swal.fire("Updated!", "Student details updated successfully", "success");
            navigate("/");
        } catch (err) {
            console.error("Update error:", err);
            Swal.fire("Error", err.response?.data?.message || "Failed to update", "error");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Edit Student</h3>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Roll Number</label>
                    <input
                        type="text"
                        name="rollNumber"
                        className="form-control"
                        value={formData.rollNumber}
                        onChange={handleChange}
                    />
                </div> */}
                <button type="submit" className="btn btn-primary me-2">
                    Update
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
