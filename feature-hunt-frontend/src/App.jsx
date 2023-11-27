import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import { DashboardPage } from "./Pages/DashboardPage/DashboardPage";
import { CreateCompanyPage } from "./Pages/CreateCompanyPage/CreateCompanyPage";
import { CreateProductPage } from "./Pages/CreateProductPage/CreateProductPage";
import { ProductPage } from "./Pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<DashboardPage />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
