import { useEffect, useState } from "react";
import IStudents from "../interfaces/student";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function List() {
  const[students, setStudents] = useState<IStudents[]>([]);

  useEffect(() => {
    const getAllStudents = async () => {
      const {data} = await axios.get(`http://localhost:3000/students`);
      if(data){
        setStudents(data)
      }
    }
    getAllStudents();
  },[]);

  const handleDelete = async (id:string) => {
    if(window.confirm("Are you sure ?")){
      try {
        await axios.delete(`http://localhost:3000/students/${id}`);
        toast.success("Complete !");
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    }
  }

  return (
    <div>
      <Link className="btn btn-primary" to={`add`}>Add</Link>
      <h1>Danh sách</h1>
      <table className="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Image</th>
            <th scope="col">Major</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((item: IStudents, index: number) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td>
                <img src={item.image} height={"60px"} alt="" />
              </td>
              <td>{item.major}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                <Link className="btn btn-warning" to={`update/${item.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
