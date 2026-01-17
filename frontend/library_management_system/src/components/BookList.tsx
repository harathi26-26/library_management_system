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
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};

      if (search) params.search = search;
      if (available !== "") params.available = available;

      const res = await getBooks(params);
      let data = res.data;

      // 🔃 Sorting (frontend)
      if (sort === "title") {
        data = [...data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (sort === "copies") {
        data = [...data].sort(
          (a, b) => b.available_copies - a.available_copies
        );
      }

      setBooks(data);
    } catch (err) {
      console.error("Failed to load books", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Reload when refreshKey changes
  useEffect(() => {
    loadBooks();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    await deleteBook(id);
    loadBooks(); // 🔁 auto refresh
  };

  return (
    <div className="book-list">
      <h2>📚 Book List</h2>

      {/* 🔍 Search + Filter + Sort */}
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

        {/* <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">No Sorting</option>
          <option value="title">Sort by Title</option>
          <option value="copies">Sort by Copies</option>
        </select> */}

        <button onClick={loadBooks}>Apply</button>
      </div>

      {/* 📖 Book Items */}
      {loading && <p>Loading books...</p>}

      {!loading && books.length === 0 && (
        <p>No books found.</p>
      )}

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
              <button className="btn btn-edit"onClick={() => onEdit(b)}>✏️ Edit</button>
              <button className="btn btn-delete" onClick={() => handleDelete(b.id)}>❌ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
