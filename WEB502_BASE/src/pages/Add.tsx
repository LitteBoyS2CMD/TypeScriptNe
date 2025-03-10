import { useForm } from "react-hook-form";
import { InputStudent } from "../interfaces/student";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

function Add() {
  const{register, handleSubmit, formState: {errors}} = useForm<InputStudent>()
  const navigate = useNavigate();

  const onSubmit = async (data:InputStudent) => {
    try {
      await axios.post(`http://localhost:3000/students`, data)
      toast.success("Complete !");
      navigate('/students')
    } catch (error) {
      toast.error((error as AxiosError).message)
    }
  }

  return (
    <div>
      <h1>Thêm mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="text" {...register("name", {required: "Error !!!"})} />
          {errors?.name && (<span className="text-danger">{errors?.name.message}</span>)}
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Year
          </label>
          <input type="number" className="form-control" id="text" {...register("year", {required: "Error !!!"})}  />
          {errors?.year && (<span className="text-danger">{errors?.year.message}</span>)}
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Image
          </label>
          <input type="text" className="form-control" id="text" {...register("image", {required: "Error !!!"})}  />
          {errors?.image && (<span className="text-danger">{errors?.image.message}</span>)}
        </div>

        <div className="mb-3">
          <label htmlFor="selectOption" className="form-label">
            Major
          </label>
          <select className="form-select" {...register("major", {required: "Error !!!"})}  >
            <option value={1}>CNTT</option>
            <option value={2}>Marketing</option>
            <option value={3}>Design</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
