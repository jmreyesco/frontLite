import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EmpresasPage from "./pages/EmpresasPage";
import ProductosPage from "./pages/ProductosPage";
import InventariosPage from "./pages/InventariosPage";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";
import VerEmpresas from "./pages/VerEmpresas";
import VerProductos from "./pages/VerProductos";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/empresas" element={<EmpresasPage />} />
            <Route path="/empresas/:id" element={<EmpresasPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/inventarios" element={<InventariosPage />} />
            <Route path="/verempresas" element={<VerEmpresas />} />
            <Route path="/verempresas/:id" element={<VerEmpresas />} />
            <Route path="/verproductos" element={<VerProductos />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App