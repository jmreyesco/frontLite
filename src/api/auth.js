import axios from 'axios'
import { TextEncoder } from 'text-encoding';


const API = 'http://localhost:8080/api'


const API_URL = 'http://localhost:8080/oauth/token';

export const loginRequest = async (user) => {
  try {
    const clientId = "angularapp"; // Configurado en el servidor
    const clientSecret = "12345"; // Configurado en el servidor

    // Codificar el clientId:clientSecret a Base64
    const auth = btoa(`${clientId}:${clientSecret}`);

    // Crear los datos del formulario de autenticación
    const params = new URLSearchParams();
    params.append("grant_type", "password"); // El tipo de grant solicitado
    params.append("username", user.username);
    params.append("password", user.password);

    // Realizar la solicitud POST
    const response = await axios.post(
      "http://localhost:8080/oauth/token", // Ruta hacia el servidor OAuth2
      params.toString(), // Convertir datos del formulario en formato de cadena explícitamente
      {
        headers: {
          Authorization: `Basic ${auth}`, // Autorización del cliente (Basic Authentication)
          "Content-Type": "application/x-www-form-urlencoded", // Es importante este tipo de contenido
        },
      }
    );

    // Devolver el token del servidor (JWT)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en la autenticación:", error.response.data);
      // Capturar y devolver descripción del error si está disponible
      if (error.response.data && error.response.data.error_description) {
        return Promise.reject(error.response.data.error_description);
      }
      if (error.response.status === 401) {
        return Promise.reject("Credenciales incorrectas");
      }
    } else {
      console.error("Error de red u otros problemas:", error.message);
    }
    return Promise.reject(error);
  }
};



// Subir archivo PDF al servidor
export const uploadPDFRequest = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("http://localhost:8080/api/sendemail", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  
};


  export const getTasksRequest =  () => axios.get(`${API}/empresas`)

  export const getTaskRequest =  (id) => axios.get(`${API}/empresas/${id}`)

  export const createTaskRequest =  (task) => axios.post(`${API}/empresas`, task)
  export const updateTaskRequest =  (id, task) => axios.put(`${API}/empresas/${id}`, task)
  export const deleteTaskRequest =  (id) => axios.delete(`${API}/empresas/${id}`)


  export const createProductRequest =  (task) => axios.post(`${API}/productos`, task)
//export const createProductRequest = (task) => axios.post(`${API}/productos`, { empresa: { id: task.empresa } });

 export const verProductRequest =  () => axios.get(`${API}/productos`)
  