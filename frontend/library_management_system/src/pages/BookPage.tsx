import { useState } from "react";
import type { Book } from "../types";

import BookForm from "../components/BookForm";
import UpdateBookForm from "../components/UpdateBookForm";
import BookList from "../components/BookList";

export default function BooksPage() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [refreshBooks, setRefreshBooks] = useState(0);

  const triggerRefresh = () =>
    setRefreshBooks((prev) => prev + 1);

  const clearEdit = () => {
    setEditingBook(null);
    triggerRefresh();
  };

  return (
    <div className="container">
      {/* Add Book */}
      <div className="card">
        <BookForm onAdded={triggerRefresh} />
      </div>

      {/* Edit Book */}
      {editingBook && (
        <div className="card">
          <UpdateBookForm
            book={editingBook}
            onUpdated={clearEdit}
            onCancel={() => setEditingBook(null)}
          />
        </div>
      )}

      {/* Book List */}
      <div className="card book-list">
        <BookList
          refreshKey={refreshBooks}
          onEdit={(book) => setEditingBook(book)}
        />
      </div>
    </div>
  );
}
