import axios from "axios";
import { da } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface IPermission {
  api_path: string;
  description: string;
  method: string;
  module: string;
  permission_id: string;
}

interface IData {
  description: string;
  permissions: string[];
}
const RoleAddPage = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const fetchAllPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/permissions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setPermissions(response.data.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  }

  const [data, setData] = useState<IData>({
    description: '',
    permissions: []
  });
  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      description: value
    }));
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    if (checked === true && name === "permissions") {
      setData((prevData) => ({
        ...prevData,
        permissions: [...prevData.permissions, value]
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        permissions: prevData.permissions.filter((permission) => permission !== value)
      }));
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:3000/api/roles', {
      description: data.description,
      permissions: data.permissions
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    if (response.data.statusCode === 201) {
      toast.success("Create role successfully");
      setData({
        description: '',
        permissions: []
      })
    } else {
      toast.error(`Create role failed:`);
    }
  }

  return (
    <div>
      <h2>Add New Role</h2>
      <form>
        <div>
          <label htmlFor="roleName">Description:</label>
          <input type="text" name="description" required value={data.description} onChange={handleChangeDescription} />
        </div>
        {/* permissions: */}
        <div>
          {permissions?.map((permission: IPermission) => (
            <div key={permission.permission_id} onChange={handleChange}>
              <label>
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission.permission_id}
                />
                {permission.description} ({permission.method.toUpperCase()} {permission.api_path})
              </label>
            </div>
          ))}
        </div>

        <button type="submit" onClick={handleSubmit}>Add Role</button>
      </form>
    </div>
  )
}

export default RoleAddPage;