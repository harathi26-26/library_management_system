import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">
        📚 LIBRARY MANAGEMENT SYSTEM
      </div>

      <nav className="nav">
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          BOOKS
        </NavLink>

        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          ISSUES
        </NavLink>
      </nav>
    </header>
  );
}
