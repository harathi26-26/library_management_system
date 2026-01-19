import { useEffect, useState } from "react";
import { issueBook, getBooks } from "../api/api";
import type { Book } from "../types";

interface Props {
  onIssued: () => void;
}

export default function IssueForm({ onIssued }: Props) {
  const [bookId, setBookId] = useState<number | "">("");
  const [studentName, setStudentName] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    getBooks().then((res) => setBooks(res.data));
  }, []);

  const handleIssue = async () => {
    setMessage(null);

    if (!bookId || !studentName.trim()) {
      setMessage({
        type: "error",
        text: "Please enter Book ID and Student Name",
      });
      return;
    }

    const book = books.find((b) => b.id === Number(bookId));
    if (!book) {
      setMessage({
        type: "error",
        text: "Book ID does not exist",
      });
      return;
    }

    if (book.available_copies <= 0) {
      setMessage({
        type: "error",
        text: "Book is out of stock",
      });
      return;
    }

    await issueBook({
      book_id: Number(bookId),
      student_name: studentName.trim(),
    });

    setMessage({
      type: "success",
      text: "Book issued successfully",
    });

    setBookId("");
    setStudentName("");

    onIssued(); // notify parent
  };

  return (
    <div>
      <h3>📕 ISSUE BOOK</h3>

      {message && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label>Book ID</label>
        <input
          type="number"
          min={1}
          value={bookId}
          onChange={(e) => setBookId(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Student Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleIssue}>
        ISSUE BOOK
      </button>
    </div>
  );
}
