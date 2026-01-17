import { useState } from "react";
import { createBook } from "../api/api";
import type { BookCreate } from "../types";

export default function BookForm() {
  const [book, setBook] = useState<BookCreate>({
    title: "",
    author: "",
    available_copies: 1,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      alert("Please fill all fields");
      return;
    }

    await createBook(book);
    alert("Book added successfully");

    setBook({ title: "", author: "", available_copies: 1 });
  };

  return (
    <form>
      <div className="form-title">
        <h3>➕ ADD NEW BOOK</h3>
      </div>

      {/* Book Title */}
      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          placeholder="e.g., Clean Code"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

      </div>

      {/* Author Name */}
      <div className="form-group">
        <label>Author Name</label>
        <input
          type="text"
          placeholder="e.g., Robert C. Martin"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
      </div>

      {/* Available Copies */}
      <div className="form-group">
        <label>Available Copies</label>
        <input
          type="number"
          min="0"
          value={book.available_copies}
          onChange={(e) =>
            setBook({
              ...book,
              available_copies: Math.max(0, Number(e.target.value)),
            })
          }
        />
      </div>

      <button onClick={submit}>Add Book</button>
    </form>
  );
}
