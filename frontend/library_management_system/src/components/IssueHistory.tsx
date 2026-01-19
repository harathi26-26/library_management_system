import { useEffect, useState } from "react";
import { getIssues, returnBook } from "../api/api";
import type { Issue } from "../types";

interface Props {
  refreshKey: number;
}

const ITEMS_PER_PAGE = 10;

export default function IssueHistory({ refreshKey }: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [filterBookId, setFilterBookId] = useState("");

  const loadIssues = async () => {
    const res = await getIssues();
    // latest first
    setIssues(res.data.reverse());
    setPage(1); // reset page after reload
  };
  const handleReset = () => {
    setFilterBookId("");
    setPage(1);
    loadIssues();
  }
  useEffect(() => {
    loadIssues();
  }, [refreshKey]);

  /* 🔍 FILTER LOGIC */
  const filteredIssues = filterBookId
    ? issues.filter(
        (i) => i.book_id === Number(filterBookId)
      )
    : issues;

  /* 📄 PAGINATION LOGIC */
  const totalPages = Math.ceil(
    filteredIssues.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedIssues = filteredIssues.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  const handleReturn = async (id: number) => {
    await returnBook(id);
    loadIssues();
  };

  return (
    <div>
      <h3>🕘 ISSUE HISTORY</h3>

      {/*  FILTER BAR */}
      <div className="filter-bar">
        <input
          type="number"
          min="1"
          placeholder="Filter by Book ID"
          value={filterBookId}
          onChange={(e) => {
            setFilterBookId(e.target.value);
            setPage(1); // reset page on filter change
          }}
        />

        <button onClick={handleReset}>Reset</button>
      </div>

      {paginatedIssues.length === 0 && (
        <p>No issue records found.</p>
      )}

      {paginatedIssues.map((i, index) => {
  const serialNo = (page - 1) * ITEMS_PER_PAGE + index + 1;

  return (
    <div key={i.id} className="issue-card">
      {/* SERIAL NUMBER */}
      <div className="issue-number">{serialNo}</div>

      {/* CONTENT */}
      <div className="issue-details">
        <p><b>Book ID:</b> {i.book_id}</p>
        <p><b>Student:</b> {i.student_name}</p>
        <p>
          <b>Status:</b>{" "}
          <span
            className={
              i.status === "Issued"
                ? "status-issued"
                : "status-returned"
            }
          >
            {i.status}
          </span>
        </p>
      </div>

      {/* ACTION */}
      {i.status === "Issued" && (
        <button
          className="return-btn"
          onClick={() => handleReturn(i.id)}
        >
          Return
        </button>
      )}
    </div>
  );
})}

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
