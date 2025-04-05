import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import MarksManager from "./pages/MarksManager";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">

        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-primary me-2">Students</Link>
          <Link to="/marks" className="btn btn-outline-secondary">Marks</Link>
        </nav>
        <Routes>
          <Route path="/" element={<StudentList />} />

          <Route path="/add" element={<AddStudent />} />

          <Route path="/edit/:id" element={<EditStudent />} />

          <Route path="/marks" element={<MarksManager />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
