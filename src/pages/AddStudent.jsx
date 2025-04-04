import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function AddStudent() {
    const [formData, setFormData] = useState({ name: "", rollNumber: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            return Swal.fire("Validation Error", "All fields are required.", "warning");
        }

        try {
            await API.post("/students", formData);
            Swal.fire("Success", "Student added successfully.", "success");
            navigate("/");
        } catch (err) {
            console.error("Add error:", err);
            Swal.fire("Error", err.response?.data?.message || "Failed to add student.", "error");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Add New Student</h3>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter student name"
                    />
                </div>
                <div>
                    <label htmlFor="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="form-label">
                        Age</label>
                    <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="form-label">
                        Gender
                    </label>
                    <input
                        type="text"
                        name="gender"
                        className="form-control"
                        value={formData.gender}
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
                        placeholder="Enter roll number"
                    />
                </div> */}
                <button type="submit" className="btn btn-success me-2">
                    Submit
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
