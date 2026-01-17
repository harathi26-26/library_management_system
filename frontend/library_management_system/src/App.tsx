import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./styles/base.css";
import "./styles/components.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Home />
      </main>
      <Footer />
    </>
  );
}
