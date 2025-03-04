import { useForm } from "react-hook-form";
import { InputStudent } from "../interfaces/student";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

function Update() {
  const{register, handleSubmit, formState: {errors}, reset} = useForm<InputStudent>()
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if(id){
      const getStudentById = async () => {
        const {data} = await axios.get(`http://localhost:3000/students/${id}`);
        if(data){
          reset(data);
        }
      }
      getStudentById();
    }
    
  },[id]);

  const onSubmit =async (data:InputStudent) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, data)
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
          <label htmlFor="number" className="form-label">
            Year
          </label>
          <input type="text" className="form-control" id="text" {...register("year", {required: "Error !!!"})}  />
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
            <option value={"CNTT"}>CNTT</option>
            <option value={"Marketing"}>Marketing</option>
            <option value={"Design"}>Design</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update