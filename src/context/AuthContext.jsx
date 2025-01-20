
import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../api/auth";



export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      
    }
  }, []);
  
  


  const signin = async (user) => {
    setLoading(true); // Activar estado de carga
    try {
      console.log("Datos recibidos en signin:", user);

      const res = await loginRequest({
        username: user.username,
        password: user.password,
      });
      console.log("res.data:", res);

      const { access_token } = res;

      // Guardar el token en localStorage
      localStorage.setItem("access_token", access_token);

      // Actualizar estado de usuario y autenticación
      setUser({ username: user.username });
      setIsAuthenticated(true);

      console.log("Inicio de sesión exitoso.");
      return true; // Retornar éxito
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error);
      setIsAuthenticated(false); // Restablecer el estado de autenticación
      return false; // Retornar fallo
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  // Función para cerrar sesión
  const signout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    console.log("Sesión cerrada");
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        user,
        // usuario,
        // password,
        signout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}