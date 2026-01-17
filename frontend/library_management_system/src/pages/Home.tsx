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
    setRefreshBooks((prev) => prev+1);
  const clearEdit = () => {
    setEditingBook(null);
    triggerRefresh();
  };


  return (
    <div className="container">
      {/* 🔹 Top section: Add + Issue side by side */}
      <div className="two-column">
        <BookForm onAdded={triggerRefresh}/>
        <IssueForm />
      </div>

      {/* 🔹 Update section */}
      {editingBook && (
        <div className="section-card">
          <UpdateBookForm
            book={editingBook}
            onCancel={() => setEditingBook(null)}
            onUpdated={clearEdit}
          />
        </div>
      )}

      {/* 🔹 Book list */}
      <BookList onEdit={setEditingBook}
                refreshKey={refreshBooks} />

      {/* 🔹 Issue history */}
      <IssueHistory />
    </div>
  );
}
