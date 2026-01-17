import { useEffect, useState } from "react";
import { getIssues, returnBook } from "../api/api";
import type { Issue } from "../types";

export default function IssueHistory() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load issue history
  const loadIssues = async () => {
    setLoading(true);
    try {
      const res = await getIssues();
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
      alert("Failed to load issue history");
    } finally {
      setLoading(false);
    }
  };

  // Return book handler
  const handleReturn = async (issueId: number) => {
    try {
      await returnBook(issueId);
      alert("Book returned successfully");
      loadIssues(); // refresh list
    } catch (error) {
      console.error("Return failed:", error);
      alert("Failed to return book");
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div className="issue-history">
      <h3>📕 Issue History</h3>

      {loading && <p>Loading...</p>}

      {!loading && issues.length === 0 && (
        <p>No issue records found.</p>
      )}

      <ul>
        {issues.map((i) => (
          <li key={i.id}>
            <div>
              <div>
                <strong>Book ID:</strong> {i.book_id}
              </div>
              <div>
                <strong>Student:</strong> {i.student_name}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    i.status === "Issued"
                      ? "status-issued"
                      : "status-returned"
                  }
                >
                  {i.status}
                </span>
              </div>
            </div>

            {i.status === "Issued" && (
              <button
                className="return-btn"
                onClick={() => handleReturn(i.id)}
              >
                Return
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
