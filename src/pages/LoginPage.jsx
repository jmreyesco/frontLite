import {useEffect} from "react";
import { Card, Message, Button, Input, Label } from "../components/iu";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const { register, handleSubmit } = useForm();
  //Del Contexto, traigo la funcion sigin que se conecta a la ruta auth axios 
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();  // Usamos useNavigate para redirigir
  
    // Restaurar autenticación y redirigir si ya está autenticado
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/verempresas"); // Redirige si el usuario ya está logueado
      }
    }, [isAuthenticated, navigate]);


    //Metodo onSubmit de envio de datos
    const onSubmit = async (data) => {
      console.log(data);
       // Llamada a la función signin que hace la solicitud de login
    const success = await signin({
      username: data.email,  
      password: data.password,  
    });

    if (success) {
      navigate("/verempresas");
    }     
    };

  //Si esta autenticado redireccione a la ruta raiz
  // useEffect(() => {
  //   if (isAuthenticated) navigate("/");
  // }, [isAuthenticated]);

  return (
    <div className=" h-[calc(100vh-100px)]  items-center justify-center grid ">
      <Card>
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email:</Label>
          <Input
            label="Write your email"
            type="text"
            name="email"
            placeholder="correo@dominio.com"
            {...register("email")}
          />

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
          />

          <Button>Login</Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
