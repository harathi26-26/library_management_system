import { useState } from "react";
import type { Book } from "../types";

import BookForm from "../components/BookForm";
import UpdateBookForm from "../components/UpdateBookForm";
import BookList from "../components/BookList";
import IssueForm from "../components/IssueForm";
import IssueHistory from "../components/IssueHistory";

export default function Home() {
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

      {/* ADD BOOK + ISSUE BOOK */}
      <div className="two-column">
        <div className="card">
          <BookForm onAdded={triggerRefresh} />
        </div>

        <div className="card">
          <IssueForm />
        </div>
      </div>

      {/* EDIT BOOK */}
      {editingBook && (
        <div className="card">
          <UpdateBookForm
            book={editingBook}
            onUpdated={clearEdit}
            onCancel={() => setEditingBook(null)}
          />
        </div>
      )}

      {/* BOOK LIST */}
      <div className="card book-list">
        <BookList
          refreshKey={refreshBooks}
          onEdit={(book) => setEditingBook(book)}
        />
      </div>

      {/* ISSUE HISTORY */}
      <div className="card issue-history">
        <IssueHistory />
      </div>

    </div>
  );
}
