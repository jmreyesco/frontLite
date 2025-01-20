import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  updateTaskRequest,
  createProductRequest,
  getTaskRequest,
  uploadPDFRequest,
  verProductRequest
} from "../api/auth";

import Swal from "sweetalert2";

// 1. Crear el conyecto from 'react'
const TaskContext = createContext();

//3. Metodo para usar el Contexto desde otro componente --export--
//3.1 ir a App.js y se engloba el context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  //4. Funcion para crear tareas
  const createTask = async (task) => {
    try {
      console.log("Creating task:", task);
      const res = await createTaskRequest(task);
      //return res.data;
      if (res.data) {
        //Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Reseña creada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProoduct = async (task) => {
    try {
      console.log("Creating task:", task);
      const res = await createProductRequest(task);
      //return res.data;
      if (res.data) {
        //Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Reseña creada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //**** */ 5. Funcion para GEt****
  const getTasks = async () => {
    //const res = await getTasksRequest();
    try {
      const res = await getTasksRequest();
      //console.log('respuesta:', res);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

    //**** */ 5. Funcion para GEt Productos ****
    const getProductosTasks = async () => {
      //const res = await getTasksRequest();
      try {
        const res = await verProductRequest();
        console.log('respuesta:', res);
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
       console.error("Error en deleteTaskRequest:", error.response || error);
    }
  };

  //****update process** */
  const getTask = async (id) => {
    console.log("getTask");

    const res = await getTaskRequest(id);
    console.log("res:", res.data);

    return res.data;
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  // Subir un PDF para su envío por correo
  const uploadPDF = async (file) => {
    try {
      const response = await uploadPDFRequest(file); // Llamada a la API
      return response.data;
    } catch (error) {
      console.error("Error al subir PDF:", error);
      throw new Error("No se pudo enviar el PDF.");
    }
  };

  // ********--------------************

  //2. Creacionde Provider que es el contenedor de todos los componentes que quieran accceder a el
  //2.1 Se inscriben los elementos que se van a comparir (metodos o varibles)
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        updateTask,
        createProoduct,
        getTask,
        uploadPDF,
        getProductosTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
