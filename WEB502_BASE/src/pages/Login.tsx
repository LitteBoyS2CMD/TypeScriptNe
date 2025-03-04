import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { login } from "../interfaces/user";

function Login() {
  const{register, handleSubmit, formState: {errors}} = useForm<login>();
  const navigate = useNavigate();

  const onSubmit = async (data:login) => {
    try {
      await axios.post(`http://localhost:3000/login`, data)
      toast.success("Complete !");
      navigate('/students')
    } catch (error) {
      toast.error((error as AxiosError).message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Email
          </label>
          <input type="text" className="form-control" id="text" {...register("email", {required: "Error !!!"})}  />
          {errors?.email && (<span className="text-danger">{errors?.email.message}</span>)}
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="text" {...register("password", {required: "Error !!!"})}  />
          {errors?.password && (<span className="text-danger">{errors?.password.message}</span>)}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
