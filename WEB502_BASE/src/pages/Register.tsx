import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { register } from "../interfaces/user";

function Register() {
  const{register, handleSubmit, formState: {errors}, watch} = useForm<register>();
  const navigate = useNavigate();

  const onSubmit = async (data:register) => {
    try {
      data.confirmPassword = undefined;
      await axios.post(`http://localhost:3000/register`, data)
      toast.success("Complete !");
      navigate('/login')
    } catch (error) {
      toast.error((error as AxiosError).message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="text" {...register("username", {required: "Error !!!"})} />
          {errors?.username && (<span className="text-danger">{errors?.username.message}</span>)}
        </div>

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

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="text" {...register("confirmPassword", {required: "Error !!!", validate: (value) => {
            return (
                value == watch("password") || "Error !!!"
            )
          }})}  />
          {errors?.confirmPassword && (<span className="text-danger">{errors?.confirmPassword.message}</span>)}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
