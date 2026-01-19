import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksPage from "./pages/BookPage";
import IssuesPage from "./pages/IssuePage";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/issues" element={<IssuesPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
