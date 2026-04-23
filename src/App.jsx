import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Toast from "./components/layouts/Toast";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/shipment/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <Toast />
      </div>
    </BrowserRouter>
  );
};

export default App;
