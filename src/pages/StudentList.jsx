import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StudentForm from "../components/StudentFormModal";

const API_BASE = "http://localhost:3000/api";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingStudent, setEditingStudent] = useState(null);

    const limit = 5;

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API_BASE}/students?page=${page}&limit=${limit}`);
            console.log("Response from paginated API:", res?.data);
            setStudents(res?.data?.students || []);
            // const total = res?.data?.total || 0;
            const total = res?.data?.totalStudents?.length || 0;
            setTotalPages(Math.max(1, Math.ceil(total / limit)));

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to load students", "error");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page]);

    const handleStudentSubmit = async (formData) => {
        try {
            if (editingStudent) {
                // 🔧 Update student
                await axios.put(`${API_BASE}/students/${editingStudent._id}`, formData);
                Swal.fire("Updated", "Student updated successfully", "success");
            } else {
                // ➕ Add new student
                await axios.post(`${API_BASE}/students`, formData);
                Swal.fire("Added", "Student added successfully", "success");
            }

            fetchStudents(); // Refresh list
            setShowForm(false); // ✅ Fix: Close modal using correct state
            setEditingStudent(null); // Reset editing state
        } catch (err) {
            console.error("Error in form submit:", err.response?.data || err.message);
            Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${API_BASE}/students/${id}`);
                Swal.fire("Deleted!", "Student has been removed.", "success");
                fetchStudents();
            } catch (err) {
                console.error("Delete error:", err);
                Swal.fire("Error", "Failed to delete student", "error");
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Student List</h3>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(true);
                        setEditingStudent(null); // For adding new
                    }}
                >
                    + Add Student
                </button>
            </div>

            {/* Modal form */}
            {showForm && (
                <StudentForm
                    show={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                    }}
                    onSubmit={handleStudentSubmit}
                    initialData={editingStudent}
                />
            )}

            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th style={{ width: "150px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-3">
                                    No students found
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => {
                                                setEditingStudent(student);
                                                setShowForm(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(student._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                // disabled={page === 1}
                >
                    Previous
                </button>
                <span className="fw-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                // disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default StudentList;
