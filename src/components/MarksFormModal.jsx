import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

function MarksFormModal({ show, onClose, onSubmit, initialData, studentId }) {
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");

    useEffect(() => {
        if (initialData) {
            setSubject(initialData.subject);
            setMarks(initialData.marks);
        } else {
            setSubject("");
            setMarks("");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject.trim() || marks === null || marks === undefined || marks === "") {
            return Swal.fire("Error", "All fields are required", "error");
        }

        const payload = {
            subject,
            score: Number(marks),
            student: studentId,
        };

        try {
            if (initialData) {
                await axios.put(`${API_BASE}/marks/${initialData._id}`, payload);
                Swal.fire("Updated", "Marks updated successfully", "success");
            } else {
                await axios.post(`${API_BASE}/marks`, payload);
                Swal.fire("Added", "Marks added successfully", "success");
            }

            onSubmit(); // refresh list
            onClose();  // close modal
        } catch (error) {
            Swal.fire(
                "Error",
                error?.response?.data?.message || "Something went wrong",
                "error"
            );
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                        {initialData ? "Edit Marks" : "Add Marks"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Subject</Form.Label>
                        <Form.Control
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g., Mathematics"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Marks</Form.Label>
                        <Form.Control
                            type="number"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            placeholder="e.g., 87"
                            min={0}
                            max={100}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        {initialData ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default MarksFormModal;
