import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const res = await API.get(`/students?page=${currentPage}&limit=${limit}`);
            setStudents(res.data.students);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [currentPage]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await API.delete(`/students/${id}`);
                Swal.fire("Deleted!", "Student has been removed.", "success");
                fetchStudents(); // Call your fetching logic to refresh list
            } catch (error) {
                console.error("Delete Error:", error);
                Swal.fire("Error", "Something went wrong during deletion.", "error");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h3>Student List</h3>
                <button className="btn btn-primary" onClick={() => navigate("/add")}>
                    Add Student
                </button>
            </div>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={student._id}>
                                <td>{(currentPage - 1) * limit + index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.rollNumber}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => navigate(`/edit/${student._id}`)}
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
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li
                                key={page}
                                className={`page-item ${page === currentPage ? "active" : ""}`}
                            >
                                <button className="page-link" onClick={() => setCurrentPage(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
