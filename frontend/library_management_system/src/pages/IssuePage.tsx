import { useState } from "react";

import IssueForm from "../components/IssueForm";
import IssueHistory from "../components/IssueHistory";

export default function IssuesPage() {
  const [refreshIssues, setRefreshIssues] = useState(0);

  const triggerRefresh = () =>
    setRefreshIssues((prev) => prev + 1);

  return (
    <div className="container">
      {/* Issue Book */}
      <div className="card">
        <IssueForm onIssued={triggerRefresh} />
      </div>

      {/* Issue History */}
      <div className="card issue-history">
        <IssueHistory refreshKey={refreshIssues} />
      </div>
    </div>
  );
}
