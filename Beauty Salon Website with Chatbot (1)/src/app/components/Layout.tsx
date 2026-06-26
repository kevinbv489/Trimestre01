import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
