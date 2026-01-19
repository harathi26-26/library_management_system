import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/api";
import type { Book } from "../types";

interface Props {
  onEdit: (book: Book) => void;
  refreshKey: number;
}

export default function BookList({ onEdit, refreshKey }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
  type: "success" | "error";
  text: string;
} | null>(null);

  const loadBooks = async () => {
  setLoading(true);
  try {
    const params: Record<string, string> = {};

    // availability filter still backend-side
    if (available !== "") params.available = available;

    const res = await getBooks(params);
    let data = res.data;

    // 🔍 FRONTEND SEARCH LOGIC (CONTROLLED)
    if (search.trim()) {
      const q = search.toLowerCase();

      if (sortBy === "title") {
        data = data.filter((b) =>
          b.title.toLowerCase().includes(q)
        );
      } 
      else if (sortBy === "author") {
        data = data.filter((b) =>
          b.author.toLowerCase().includes(q)
        );
      } 
      else {
        // default: search both
        data = data.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q)
        );
      }
    }

    // 🔃 SORTING
    if (sortBy === "title") {
      data = [...data].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "author") {
      data = [...data].sort((a, b) =>
        a.author.localeCompare(b.author)
      );
    }

    setBooks(data);
  } catch (err) {
    console.error("Failed to load books", err);
  } finally {
    setLoading(false);
  }
};


  // Reload when refreshKey changes
  useEffect(() => {
    loadBooks();
  }, [refreshKey]);

const handleDelete = async (id: number) => {
  setMessage(null);

  if (!window.confirm("Are you sure you want to delete this book?")) return;

  try {
    await deleteBook(id);

    setMessage({
      type: "success",
      text: "Book deleted successfully",
    });

    loadBooks();
  } catch (err: any) {
    setMessage({
      type: "error",
      text:
        err?.response?.data?.detail ||
        "Cannot delete book. It may be currently issued.",
    });
  }
};


  return (
    <div className="book-list">
      <h2>📚 BOOK LIST</h2>
      {message && (
  <div
    className={
      message.type === "error"
        ? "message-box error"
        : "message-box success"
    }
  >
    {message.text}
  </div>
)}


      {/* SEARCH + FILTER + SORT */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Out of Stock</option>
        </select>

        {/* 🔽 SORT DROPDOWN */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">No Sorting</option>
          <option value="title"> Book Title</option>
          <option value="author">Author</option>
        </select>

        <button onClick={loadBooks}>APPLY</button>
      </div>

      {loading && <p>Loading books...</p>}
      {!loading && books.length === 0 && <p>No books found.</p>}

      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <div>
              <div className="book-title">
                <span className="book-id">ID: {b.id}</span>
                <b>{b.title}</b>
              </div>
              <div className="book-meta">
                Author: {b.author} | Copies: {b.available_copies}
              </div>
            </div>

            <div className="action-buttons">
              <button
                type="button"
                className="btn-edit"
                onClick={() => onEdit(b)}
              >
                ✏️ EDIT
              </button>

              <button
                type="button"
                className="btn-delete"
                onClick={() => handleDelete(b.id)}
              >
                ❌ DELETE
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
