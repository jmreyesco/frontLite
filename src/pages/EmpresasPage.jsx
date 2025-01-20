import React, { useEffect } from "react";
import { Card, Button, Input, Label } from "../components/iu";

import { useAuth } from '../context/AuthContext';

import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";

import{ useNavigate, useParams  } from 'react-router-dom'



function EmpresasPage() {

  //1. Hooks de useForm para el formulario
  const { register, handleSubmit, setValue } = useForm();
  const { isAuthenticated } = useAuth();

  //2.Del Contexto, traigo la funcion de Crear que se conecta a la ruta auth axios
  // 2.1 Importaciones de variables o metodos desde el Context
  const { createTask, getTask, updateTask,  } = useTasks();

    // 3. Hook para redirección
    const navigate = useNavigate();

  //3.Metodo onSubmit de envio de datos
  const onSubmit =  (data) => {
    if (params.id) {
       updateTask (params.id, data)
    } else {
      createTask(data);
    }
    console.log(data);
      // Redirigir después de crear o actualizar
      navigate("/verempresas");
  };

  
    const params = useParams();

  useEffect(() => {
    async function loadtask() {
      if (params.id) {
        console.log("int:", params.id);
      const task = await getTask(params.id);
      console.log('task:', task);
      
      setValue('nit', task.nit)
      setValue('nombreEmpresa', task.nombreEmpresa)
      setValue('direccion', task.direccion)
      setValue('telefono', task.telefono)
      }
    }
    loadtask()
  }, []);
  

  return (
    <div className=" h-[calc(100vh-100px)]  items-center justify-center grid ">
      <Card>
        <h1 className="text-2xl font-bold">Empresa</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="nit">Nit:</Label>
          <Input
            label="Write your nit"
            type="text"
            name="nit"
            placeholder="nit"
            {...register("nit", { required: true })}
          />

          <Label htmlFor="nombre">nombre:</Label>
          <Input
            type="text"
            name="nombreEmpresa"
            placeholder="Escribe tu nombre"
            {...register("nombreEmpresa")}
          />

          <Label htmlFor="direccion">direccion:</Label>
          <Input
            type="text"
            name="direccion"
            placeholder="Escribe tu direccion"
            {...register("direccion")}
          />

          <Label htmlFor="telefono">telefono:</Label>
          <Input
            type="text"
            name="telefono"
            placeholder="Escribe tu telefono"
            {...register("telefono")}
          />

          <Button  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}>Crear</Button>
        </form>
      </Card>
    </div>
  );
}

export default EmpresasPage;
