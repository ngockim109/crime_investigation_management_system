import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

const RoleUpdatePage = () => {
  const location = useLocation();
  const role = location.state?.role;

  const [permissionGroups, setPermissionGroups] = useState<IPermissionGrouped>({});
  const [data, setData] = useState<IData>({
    description: "",
    permissions: []
  });

  useEffect(() => {
    if (role) {
      const extractedIds = role.permissions.map((p: any) =>
        typeof p === "string" ? p : p.permission_id
      );

      setData({
        description: role.description || "",
        permissions: extractedIds
      });
    }
  }, [role]);

  const fetchAllPermissions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/permissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      const permissionsData = response.data.data;
      const grouped: IPermissionGrouped = {};
      Object.keys(permissionsData).forEach((moduleName) => {
        grouped[moduleName] = permissionsData[moduleName];
      });

      setPermissionGroups(grouped);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const handleChangePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, value]
        : prev.permissions.filter((id) => id !== value)
    }));
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting role update:", data);
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/roles/${role.role_id}`,
        {
          description: data.description,
          permissions: data.permissions
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );

      if (response.data.statusCode === 200) {
        toast.success("Role updated successfully!");
      }
    } catch (error) {
      console.error("Update role failed", error);
      toast.error("Failed to update role. Please try again.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🛡️ Update Role</h1>

      <form onSubmit={handleSubmit}>
        {/* Description input */}
        <div className="mb-6">
          <Label htmlFor="description" className="block text-lg font-medium mb-2">
            Role Description
          </Label>
          <Input
            id="description"
            value={data.description}
            onChange={handleChangeDescription}
            placeholder="E.g: Admin, Investigator..."
            required
            className="w-full"
          />
        </div>

        {/* Permissions */}
        <h2 className="text-2xl font-semibold my-4">🔐 Permissions by Module</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(permissionGroups).map(([moduleName, perms]) => (
            <Card key={moduleName} className="p-4 max-h-[400px] overflow-y-auto shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📦 {moduleName}</h3>
              <div className="space-y-2">
                {perms.map((permission) => (
                  <Label key={permission.permission_id} className="flex items-start space-x-2 text-sm">
                    <input
                      type="checkbox"
                      name="permissions"
                      value={permission.permission_id}
                      checked={data.permissions.includes(permission.permission_id)}
                      onChange={handleChangePermission}
                      className="mt-1"
                    />
                    <span>
                      {permission.description}{" "}
                      <span className="text-gray-500">
                        ({permission.method} {permission.api_path})
                      </span>
                    </span>
                  </Label>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <Button type="submit" className="px-8 py-3 text-lg">
            ✅ Update Role
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoleUpdatePage;
