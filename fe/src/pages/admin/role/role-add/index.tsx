import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IPermission {
  api_path: string;
  description: string;
  method: string;
  module: string;
  permission_id: string;
}

interface IPermissionGrouped {
  [module: string]: IPermission[];
}

interface IData {
  description: string;
  permissions: string[];
}

const RoleAddPage = () => {
  const [permissionGroups, setPermissionGroups] = useState<IPermissionGrouped>({});
  const [data, setData] = useState<IData>({
    description: '',
    permissions: []
  });

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

      const permissionsData = response.data.data;
      const grouped: IPermissionGrouped = {};
      Object.keys(permissionsData).forEach(moduleName => {
        grouped[moduleName] = permissionsData[moduleName];
      });

      setPermissionGroups(grouped);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, description: event.target.value });
  };

  const handleChangePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setData(prevData => ({
      ...prevData,
      permissions: checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter(p => p !== value)
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/roles', {
        description: data.description,
        permissions: data.permissions
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.data.statusCode === 201) {
        toast.success("Create role successfully");
        setData({ description: '', permissions: [] });
      } else {
        toast.error("Create role failed");
      }
    } catch (error) {
      toast.error("Error creating role");
      console.error(error);
    }
  };

  return (
    <div style={{
      padding: "30px 50px",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
      boxSizing: "border-box"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>🛡️ Add New Role</h1>

      <form onSubmit={handleSubmit}>
        {/* Input Role Name */}
        <div style={{ marginBottom: "30px" }}>
          <label htmlFor="description" style={{ display: "block", fontWeight: "bold", marginBottom: "8px", fontSize: "18px" }}>
            Role Description
          </label>
          <input
            type="text"
            name="description"
            required
            value={data.description}
            onChange={handleChangeDescription}
            placeholder="E.g: Admin, Investigator..."
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Permissions Group */}
        <h2 style={{ margin: "30px 0 10px", fontSize: "24px" }}>🔐 Permissions by Module</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {Object.entries(permissionGroups).map(([moduleName, perms]) => (
            <div key={moduleName} style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              maxHeight: "400px",
              overflowY: "auto"
            }}>
              <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#007acc" }}>
                📦 {moduleName}
              </h3>
              <div>
                {perms.map(permission => (
                  <label key={permission.permission_id} style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      name="permissions"
                      value={permission.permission_id}
                      checked={data.permissions.includes(permission.permission_id)}
                      onChange={handleChangePermission}
                      style={{ marginRight: "8px" }}
                    />
                    {permission.description} <span style={{ color: "#888" }}>({permission.method} {permission.api_path})</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button type="submit" style={{
            backgroundColor: "#007acc",
            color: "#fff",
            border: "none",
            padding: "14px 30px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ➕ Create Role
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleAddPage;
