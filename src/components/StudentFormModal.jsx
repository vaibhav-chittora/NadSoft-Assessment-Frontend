import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const StudentFormModal = ({ show, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || "",
                age: initialData.age || "",
                gender: initialData.gender || "",
            });
        } else {
            setFormData({ name: "", email: "", age: "", gender: "" });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const { name, email, age, gender } = formData;
        if (!name || !email || !age || !gender) {
            alert("All fields are required.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>
                    {initialData ? "Edit Student" : "Add New Student"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4">
                <Form>
                    <Form.Group className="mb-4" controlId="formName">
                        <Form.Label className="fw-semibold">Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label className="fw-semibold">Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formAge">
                        <Form.Label className="fw-semibold">Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="e.g. 20"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min={1}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formAge">
                        <Form.Label className="fw-semibold">Gender</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Male"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            min={1}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer className="px-4 pb-4">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {initialData ? "Update" : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentFormModal;
