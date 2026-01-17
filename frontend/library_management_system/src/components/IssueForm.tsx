import { useState } from "react";
import { issueBook } from "../api/api";

export default function IssueForm() {
  const [bookId, setBookId] = useState(1);
  const [student, setStudent] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookId <= 0 || !student.trim()) {
      alert("Please provide valid details");
      return;
    }

    await issueBook({
      book_id: bookId,
      student_name: student,
    });

    alert("Book issued successfully");
    setBookId(1);
    setStudent("");
  };

  return (
    <form>
      <div className="form-title">
        <h3>📕 Issue Book</h3>
      </div>

      {/* Book ID */}
      <div className="form-group">
        <label>Book ID</label>
        <input
          type="number"
          min="1"
          value={bookId}
          onChange={(e) =>
            setBookId(Math.max(1, Number(e.target.value)))
          }
        />
      </div>

      {/* Student Name */}
      <div className="form-group">
        <label>Student Name</label>
        <input
          type="text"
          placeholder="e.g.,"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>

      <button onClick={submit}>Issue Book</button>
    </form>
  );
}
