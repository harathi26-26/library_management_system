import { useState } from "react";
import { createBook } from "../api/api";
import type { BookCreate } from "../types";

interface Props {
  onAdded: () => void;
}

export default function BookForm({ onAdded }: Props) {
  const [book, setBook] = useState<BookCreate>({
    title: "",
    author: "",
    available_copies: 1,
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title.trim() || !book.author.trim()) {
      setMessage({
        type: "error",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      await createBook(book);
      onAdded();

      setMessage({
        type: "success",
        text: "Book added successfully.",
      });

      setBook({ title: "", author: "", available_copies: 1 });
    } catch {
      setMessage({
        type: "error",
        text: "Failed to add book. Please try again.",
      });
    }
  };

  const updateField = (field: Partial<BookCreate>) => {
    setBook({ ...book, ...field });
    setMessage(null);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-title">
        <h3>➕ ADD NEW BOOK</h3>
      </div>

      {message && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          value={book.title}
          onChange={(e) => updateField({ title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Author Name</label>
        <input
          type="text"
          value={book.author}
          onChange={(e) => updateField({ author: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Available Copies</label>
        <input
          type="number"
          min={0}
          value={book.available_copies}
          onChange={(e) =>
            updateField({
              available_copies: Math.max(0, Number(e.target.value)),
            })
          }
        />
      </div>

      <button type="submit">ADD BOOK</button>
    </form>
  );
}
