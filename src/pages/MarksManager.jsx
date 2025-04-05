import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MarksFormModal from "../components/MarksFormModal";

const API_BASE = "http://localhost:3000/api";

function MarksManager() {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [marksList, setMarksList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMarks, setEditingMarks] = useState(null);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API_BASE}/students`);
            setStudents(res.data.students);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to load students", "error");
        }
    };

    const fetchMarks = async (studentId) => {
        if (!studentId) return;
        try {
            const res = await axios.get(`${API_BASE}/marks/${studentId}`);
            setMarksList(res.data.marks);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to load marks", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this marks entry!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${API_BASE}/marks/${id}`);
                Swal.fire("Deleted!", "Marks deleted successfully", "success");
                fetchMarks(selectedStudentId);
            } catch (err) {
                Swal.fire("Error", "Failed to delete marks", "error");
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedStudentId) {
            fetchMarks(selectedStudentId);
        }
    }, [selectedStudentId]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Marks Management</h2>
            </div>

            <div className="mb-4">
                <label htmlFor="studentSelect" className="form-label fw-semibold">
                    Select Student:
                </label>
                <select
                    id="studentSelect"
                    className="form-select"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {students.map((s) => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedStudentId && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Marks List</h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setEditingMarks(null);
                                setShowModal(true);
                            }}
                        >
                            + Add Marks
                        </button>
                    </div>

                    <MarksFormModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        onSubmit={() => fetchMarks(selectedStudentId)}
                        studentId={selectedStudentId}
                        initialData={editingMarks}
                    />

                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th style={{ width: "150px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marksList.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center text-muted">
                                            No marks found
                                        </td>
                                    </tr>
                                ) : (
                                    marksList.map((mark) => (
                                        <tr key={mark._id}>
                                            <td>{mark.subject}</td>
                                            <td>{mark.score}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => {
                                                        setEditingMarks(mark);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(mark._id)}
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
                </>
            )}
        </div>
    );
}

export default MarksManager;
