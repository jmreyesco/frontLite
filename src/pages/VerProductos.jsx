import {React, useEffect, useState} from 'react'
import { useTasks } from '../context/TasksContext';
import { v4 as uuidv4 } from "uuid";

function VerProductos() {
  const { getProductosTasks, tasks } = useTasks();

  // Estado para la moneda seleccionada
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // Tasas de cambio (puedes obtener estas tasas desde una API externa si lo prefieres)
  const exchangeRates = {
    USD: 1, // Base (Dólar)
    EUR: 0.92, // Euro
    JPY: 132.50, // Yen Japonés
    TRY: 27.10, // Lira Turca
  };

  // Efecto para obtener los productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductosTasks();
        console.log('Productos cargados:', tasks);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchData();
  }, [getProductosTasks]);

  // Manejar cambio de moneda
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // Función para convertir precios
  const convertPrice = (price) => {
    return (price * exchangeRates[selectedCurrency]).toFixed(2);
  };

  return (
    <div className="container mx-auto mt-4 flex flex-col items-center">
      {/* Selector de Moneda */}
      <div className="mb-4">
        <label htmlFor="currency" className="mr-2 text-white">Seleccionar moneda:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="border border-gray-600 bg-gray-800 text-white px-2 py-1 rounded"
        >
          <option value="USD">Dólar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="JPY">Yen Japonés (JPY)</option>
          <option value="TRY">Lira Turca (TRY)</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-700 w-full text-sm text-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th scope="col" className="border border-gray-600 px-4 py-2">Nombre del Producto</th>
              <th scope="col" className="border border-gray-600 px-4 py-2">Código</th>
              <th scope="col" className="border border-gray-600 px-4 py-2">Características</th>
              <th scope="col" className="border border-gray-600 px-4 py-2">
                Precio ({selectedCurrency})
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {task.nombreProducto || "N/A"}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {task.codigo || "N/A"}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {task.caracteristicas || "N/A"}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {convertPrice(task.precio)} {selectedCurrency}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-600 px-4 py-2 text-center">
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerProductos;