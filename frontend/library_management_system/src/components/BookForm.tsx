import { useState } from "react";
import { createBook } from "../api/api";
import type { BookCreate } from "../types";

interface Props {
  onAdded: () => void;
}

interface Message {
  type: "success" | "error";
  text: string;
}

export default function BookForm({ onAdded }: Props) {
  const [book, setBook] = useState<BookCreate>({
    title: "",
    author: "",
    available_copies: 1,
  });

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    //  Frontend validation
    if (!book.title.trim() || !book.author.trim()) {
      setMessage({
        type: "error",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      setLoading(true);

      await createBook(book);

      //  success
      setMessage({
        type: "success",
        text: "Book added successfully.",
      });

      onAdded();
      setBook({ title: "", author: "", available_copies: 1 });
    } catch (err: any) {
      //  backend errors (duplicate book)
      if (err.response?.status === 400) {
        setMessage({
          type: "error",
          text: err.response.data.detail,
        });
      } else {
        setMessage({
          type: "error",
          text: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear message when user edits input
  const updateField = (field: Partial<BookCreate>) => {
    setBook({ ...book, ...field });
    setMessage(null);
  };

  return (
    <form onSubmit={submit} className="book-form">
      <div className="form-title">
        <h3>➕ ADD NEW BOOK</h3>
      </div>

      {/*  Message */}
      {message && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Book Title */}
      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          placeholder="e.g."
          value={book.title}
          onChange={(e) =>
            updateField({ title: e.target.value })
          }
        />
      </div>

      {/* Author */}
      <div className="form-group">
        <label>Author Name</label>
        <input
          type="text"
          placeholder="e.g."
          value={book.author}
          onChange={(e) =>
            updateField({ author: e.target.value })
          }
        />
      </div>

      {/* Copies */}
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

      <button type="submit" disabled={loading}>
        {loading ? "ADDING..." : "ADD BOOK"}
      </button>
    </form>
  );
}
