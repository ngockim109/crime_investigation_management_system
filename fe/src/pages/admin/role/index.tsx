import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface IRole {
  role_id: string
  description: string
}

const RolePage = () => {

  const navigate = useNavigate()
  const [roles, setRoles] = useState<IRole[]>([])

  useEffect(() => {
    fetchAllRoles()
  }, [])

  const fetchAllRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      setRoles(response.data.data)
    } catch (error) {
      console.error("Error fetching roles:", error)
    }
  }

  console.log("Roles:",roles)

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            🛡️ Role Management
          </CardTitle>
          <Button onClick={() => navigate("add")}>➕ Create Role</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead className="min-w-[200px]">Role ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role, index) => (
                  <TableRow key={role.role_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.role_id}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/admin/roles/update/${role.role_id}`,{state: { role } })}
                      >
                        ✏️ Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {roles.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">No roles found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RolePage
