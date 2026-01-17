import { useEffect, useState } from "react";
import { updateBook } from "../api/api";
import type { Book, BookCreate } from "../types";

interface Props {
  book: Book | null;
  onCancel: () => void;
  onUpdated: () => void;
}

export default function UpdateBookForm({
  book,
  onCancel,
  onUpdated,
}: Props) {
  const [formData, setFormData] = useState<BookCreate>({
    title: "",
    author: "",
    available_copies: 0,
  });

  // Prefill when book selected
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        available_copies: book.available_copies,
      });
    }
  }, [book]);

  if (!book) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      alert("All fields are required");
      return;
    }

    if (formData.available_copies < 0) {
      alert("Available copies cannot be negative");
      return;
    }

    await updateBook(book.id, formData);
    alert("Book updated successfully");
    onUpdated();
  };

  return (
    <form>
      <h3>✏️ Update Book</h3>

      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Author Name</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Available Copies</label>
        <input
          type="number"
          min="0"
          value={formData.available_copies}
          onChange={(e) =>
            setFormData({
              ...formData,
              available_copies: Math.max(
                0,
                Number(e.target.value)
              ),
            })
          }
        />
      </div>

      <div className="action-buttons">
        <button type="submit">Update</button>
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
