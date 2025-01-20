import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../context/AuthContext';
import { jsPDF } from "jspdf";
import { Link , useParams, useNavigate} from 'react-router-dom';


function VerEmpresas() {
  const { getTasks, tasks, deleteTask, getTask, uploadPDF} = useTasks();
  const { isAuthenticated, usuario, password, signout } = useAuth();

  const [Authenticated, setAuthenticated] = useState(false);

  const params = useParams();
  const navigate = useNavigate();  


  useEffect(() => {
    getTasks()
   if(params.id){
    console.log('int:',params.id);
    getTask(params.id)
   }
    console.log('parametros:',params.id);

    if(usuario == "angularapp" & password==12345){
      console.log('iNG');
      
      setAuthenticated(true)
    }
    
  }, []);

const handleDelete = async (id) => {
  console.log("Intentando eliminar empresa:", id);
  if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
    try {
      await deleteTask(id);
      console.log("Empresa eliminada:", id);
      getTasks(); // Recarga la lista desde el servidor
    } catch (error) {
      console.error("Error en handleDelete:", error);
    }
  }
  navigate("/verempresas"); 
};

// PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text("Lista de Empresas", 14, 20);

    // Agregar tabla
    let y = 30;
    doc.setFontSize(12);
    doc.text("NIT", 14, y);
    doc.text("Nombre Empresa", 60, y);
    doc.text("Acciones", 140, y);
    y += 10;

    tasks.forEach(task => {
      doc.text(task.nit, 14, y);
      doc.text(task.nombreEmpresa, 60, y);
      doc.text("Eliminar", 140, y);
      y += 10;
    });

    doc.save('empresas.pdf');
  };


  // Función para generar y enviar el PDF por correo
  const sendPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Lista de Empresas", 14, 20);

    let y = 30;
    doc.setFontSize(12);
    doc.text("NIT", 14, y);
    doc.text("Nombre Empresa", 60, y);
    y += 10;

    tasks.forEach(task => {
      doc.text(task.nit || "", 14, y);
      doc.text(task.nombreEmpresa || "", 60, y);
      y += 10;
    });

    // Crear Blob del PDF
    const pdfBlob = doc.output('blob');

    // Crear archivo para enviar
    const file = new File([pdfBlob], 'empresas.pdf', { type: 'application/pdf' });

    try {
      const response = await uploadPDF(file); // Llamar a la API que envía el archivo
      alert(response.message || "PDF enviado correctamente.");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el PDF.");
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Lista de Empresas</h1>

      {/* Botón para generar PDF */}
      <button
        onClick={generatePDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Generar PDF
      </button>
<br />
      <button
        onClick={signout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      ><Link to={`/`}>Salir</Link>
        
      </button>
<br />
      <table className="table-auto border-collapse border border-gray-600 w-full text-white">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="border border-gray-600 px-4 py-2">NIT</th>
            <th className="border border-gray-600 px-4 py-2">Nombre Empresa</th>
            <th className="border border-gray-600 px-4 py-2">Direccion</th>
            <th className="border border-gray-600 px-4 py-2">Telefono</th>
            <th className="border border-gray-600 px-4 py-2">Eliminar</th>
            <th className="border border-gray-600 px-4 py-2">Editar</th>
            <th className="border border-gray-600 px-4 py-2">Crear</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id || uuidv4()} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2 text-center">
                {task.nit}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                {task.nombreEmpresa}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                {task.direccion}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                {task.telefono}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(task.id)}
                   className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                > 
                  <Link to={`/empresas/${task.id}`}>Eliminar</Link>
                </button>
              </td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                <button  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                ><Link to={`/empresas/${task.id}`}>Edit</Link>
                  </button>
              </td>
                 <td className="border border-gray-600 px-4 py-2 text-center">
                <button  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                ><Link to={`/empresas`}>Crear</Link>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<br />
      <button
        onClick={sendPDF}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4"
      >
        Enviar PDF por Correo
      </button>
    </div>
  );
}

export default VerEmpresas;
