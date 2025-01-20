import React from "react";
import { Card, Message, Button, Input, Label } from "../components/iu";

import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";

function ProductosPage() {

    const { register, handleSubmit } = useForm();
    //Del Contexto, traigo la funcion sigin que se conecta a la ruta auth axios 
    const { signin, isAuthenticated, createProoduct } = useTasks();


  
      //Metodo onSubmit de envio de datos
      const onSubmit = async (data) => {
        // Crear un objeto 'empresa' con el id
        const productoData = {
          ...data,
          empresa: { id: data.empresa_id }, // Aquí transformamos el 'empresa_id' en un objeto con 'id'
        };
        console.log(productoData); // Verificamos la estructura antes de enviarlo
        createProoduct(productoData); // Llamamos a la función para crear el producto
      };

  return (
    <div className=" h-[calc(100vh-100px)]  items-center justify-center grid ">
      <Card>
        <h1 className="text-2xl font-bold">Productos</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="codigo">codigo:</Label>
          <Input
            label="Write your email"
            type="text"
            name="codigo"
            placeholder="codigo"
            {...register("codigo", { required: true })}
          />

          <Label htmlFor="nombreProducto">nombre:</Label>
          <Input
            type="text"
            name="nombreProducto"
            placeholder="Escribe tu nombre"
            {...register("nombreProducto")}
          />
          <Label htmlFor="caracteristicas">caracteristica:</Label>
          <Input
            type="text"
            name="caracteristicas"
            placeholder="caracteristica"
            {...register("caracteristicas")}
          />
          <Label htmlFor="precio">precio:</Label>
          <Input
            type="number"
            name="precio"
            placeholder="precio"
            {...register("precio")}
          />
          {/* <Label htmlFor="factory">empresa:</Label>
          <Input
            type="number"
            name="factory"
            placeholder="Escribe empresa"
            {...register("factory")}
          /> */}

          {/* <Label htmlFor="empresa_id">empresa:</Label>
          <Input
            type="text"
            name="empresa_id"
            placeholder="Escribe tu contraseña"
            {...register("empresa_id")}
          /> */}

          <Label htmlFor="empresa_id">ID Empresa:</Label>
          <Input
            type="number"
            name="empresa_id"
            placeholder="Ingrese el ID de la empresa"
            {...register("empresa_id", { required: true })}
          />

          <Button>Crear</Button>
        </form>
      </Card>
    </div>
  );
}

export default ProductosPage