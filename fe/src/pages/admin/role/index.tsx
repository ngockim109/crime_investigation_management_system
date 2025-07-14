import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IRole {
  role_id: string;
  description: string
}

const RolePage = () => {
  const navigate=useNavigate()
  const [roles, setRoles] = useState<IRole[] | null>(null);
  useEffect(() => {
    fetchAllRoles();
  }, [])
  const fetchAllRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/roles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  return (
    <>
      <div>
        <h2>Table roles</h2>
        <button onClick={() => { navigate('add')}}>Create Role</button>
      </div>
      <div>
        {
          roles && (
            <table className="table">
              <thead>
                <tr>
                  <th>Role ID</th>
                  <th>Role Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role: IRole) => (
                  <tr key={role.role_id}>
                    <td>{role.role_id}</td>
                    <td>{role.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    </>
  )
}

export default RolePage