
import React, { useState } from "react";
import { Card, Message, Button, Input, Label } from "../components/iu";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from '../context/AuthContext';


const schema = yup.object({
  empresa_id: yup
    .number()
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .required("El ID de empresa es requerido"),
  factory: yup.string().required("El campo factory es obligatorio"),
  codigo: yup.string().required("El código es obligatorio"),
  nombreProducto: yup.string().required("El nombre del producto es obligatorio"),
  caracteristicas: yup.string(),
  precio: yup
    .number()
    .positive("El precio debe ser positivo")
    .required("El precio es obligatorio"),
});

function ProductosPage() {

  const { isAuthenticated } = useAuth();


  const [producto, setProducto] = useState({
    empresa_id: 0,
    factory: "",
  });

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const { createProoduct } = useTasks();

  const handleEmpresaChange = (e) => {
    const empresaId = parseInt(e.target.value, 10);
    let factoryName = "";

    switch (empresaId) {
      case 14:
        factoryName = "DC";
        break;
      case 15:
        factoryName = "Marvel";
        break;
      case 16:
        factoryName = "Comic Colombia";
        break;
      default:
        factoryName = "";
    }

    setProducto({
      ...producto,
      empresa_id: empresaId,
      factory: factoryName,
    });

    setValue("empresa_id", empresaId, { shouldValidate: true });
    setValue("factory", factoryName, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log(data);
    await createProoduct(data);
  };

  return (
    <div className=" h-[calc(100vh-100px)] items-center justify-center grid">
      <Card>
        <h1 className="text-2xl font-bold">Productos</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="codigo">Código:</Label>
          <Input
            type="text"
            name="codigo"
            placeholder="Código"
            {...register("codigo")}
          />

          <Label htmlFor="nombreProducto">Nombre:</Label>
          <Input
            type="text"
            name="nombreProducto"
            placeholder="Escribe el nombre del producto"
            {...register("nombreProducto")}
          />

          <Label htmlFor="caracteristicas">Características:</Label>
          <Input
            type="text"
            name="caracteristicas"
            placeholder="Características"
            {...register("caracteristicas")}
          />

          <Label htmlFor="precio">Precio:</Label>
          <Input
            type="number"
            name="precio"
            placeholder="Precio"
            {...register("precio")}
          />

          <Label htmlFor="empresa_id">Empresa:</Label>
          <select
            name="empresa_id"
            value={producto.empresa_id}
            onChange={handleEmpresaChange}
            className="p-2 w-full bg-gray-700 text-white rounded-md"
          >
            <option value="">Seleccione una empresa</option>
            <option value="14">DC</option>
            <option value="15">Marvel</option>
            <option value="16">Comic Colombia</option>
          </select>

          <Label htmlFor="factory">Factory:</Label>
          <Input
            type="text"
            name="factory"
            value={producto.factory}
            readOnly
            disabled
            className="p-2 w-full bg-gray-700 text-white rounded-md"
          />

          {/* Campo oculto para sincronización */}
          <Input
            type="hidden"
            {...register("factory")}
            value={producto.factory}
          />
          <br />
          <br />
          {isAuthenticated && (
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${
                !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Crear
            </button>
          )}
        </form>
      </Card>
    </div>
  );
}

export default ProductosPage;
