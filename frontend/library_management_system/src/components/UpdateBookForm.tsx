import { useState } from "react";
import { updateBook } from "../api/api";
import type { Book } from "../types";

interface Props {
  book: Book;
  onUpdated: () => void;
  onCancel: () => void;
}

export default function UpdateBookForm({ book, onUpdated, onCancel }: Props) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [copies, setCopies] = useState(book.available_copies);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(book.id, {
      title,
      author,
      available_copies: copies,
    });
    onUpdated();
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Edit Book</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Available Copies</label>
        <input
          type="number"
          min={0}
          value={copies}
          onChange={(e) => setCopies(Number(e.target.value))}
        />
      </div>

      <div className="edit-actions">
        <button type="submit" className="btn-primary">Update</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
