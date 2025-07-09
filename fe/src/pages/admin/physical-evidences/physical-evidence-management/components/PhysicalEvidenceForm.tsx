import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, X, Loader2 } from "lucide-react"
import type {
  PhysicalEvidence,
  CreatePhysicalEvidenceData,
} from "@/types/physical-evidence.interface"
import type { User } from "@/types/user.interface"
import type { Case } from "@/types/case.interface"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { usersApi } from "@/api/user"
import { casesApi } from "@/api/case"

interface PhysicalEvidenceFormProps {
  evidence?: PhysicalEvidence
  onSubmit: (data: CreatePhysicalEvidenceData) => void
  onCancel: () => void
  isLoading: boolean
}

const PhysicalEvidenceForm = ({
  evidence,
  onSubmit,
  onCancel,
  isLoading,
}: PhysicalEvidenceFormProps) => {
  const [formData, setFormData] = useState<
    CreatePhysicalEvidenceData & { collected_time_date?: Date }
  >({
    identification_code: "",
    scene_location: "",
    collected_time: "",
    scene_description: "",
    initial_condition: "",
    preservation_measures: "",
    case_id: "",
    collector_username: "",
    collected_time_date: undefined,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [users, setUsers] = useState<User[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingCases, setLoadingCases] = useState(false)

  // Fetch users and cases on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUsers(true)
        const usersResponse = await usersApi.getAllUsers()
        setUsers(usersResponse.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoadingUsers(false)
      }

      try {
        setLoadingCases(true)
        const casesResponse = await casesApi.getAllCases()
        setCases(casesResponse.data)
      } catch (error) {
        console.error("Error fetching cases:", error)
      } finally {
        setLoadingCases(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (evidence) {
      setFormData({
        identification_code: evidence.identification_code,
        scene_location: evidence.scene_location,
        collected_time: evidence.collected_time,
        scene_description: evidence.scene_description,
        initial_condition: evidence.initial_condition,
        preservation_measures: evidence.preservation_measures,
        case_id: evidence.case_id,
        collector_username: evidence.collector_username,
        collected_time_date: new Date(evidence.collected_time),
      })
    }
  }, [evidence, cases, users])

  const handleInputChange = (
    field: keyof CreatePhysicalEvidenceData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleSelectChange = (
    field: keyof CreatePhysicalEvidenceData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user makes selection
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.identification_code.trim()) {
      newErrors.identification_code = "Identification code is required"
    }
    if (!formData.scene_location.trim()) {
      newErrors.scene_location = "Scene location is required"
    }
    if (!formData.collected_time_date) {
      newErrors.collected_time = "Collection time is required"
    }
    if (!formData.scene_description.trim()) {
      newErrors.scene_description = "Scene description is required"
    }
    if (!formData.initial_condition.trim()) {
      newErrors.initial_condition = "Initial condition is required"
    }
    if (!formData.preservation_measures.trim()) {
      newErrors.preservation_measures = "Preservation measures are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const submitData: CreatePhysicalEvidenceData = {
        identification_code: formData.identification_code,
        scene_location: formData.scene_location,
        collected_time: formData.collected_time,
        scene_description: formData.scene_description,
        initial_condition: formData.initial_condition,
        preservation_measures: formData.preservation_measures,
        case_id: formData.case_id,
        collector_username: formData.collector_username,
      }

      onSubmit(submitData)
    }
  }

  const isEditing = !!evidence

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div>
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
        </div>
        <h1 className="text-lg font-bold text-blue-900">
          {isEditing
            ? `Edit Physical Evidence: ${evidence.identification_code}`
            : "Create New Physical Evidence"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="identification_code">
                  Temporary Identification Code{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="identification_code"
                  value={formData.identification_code}
                  onChange={(e) =>
                    handleInputChange("identification_code", e.target.value)
                  }
                  placeholder="e.g., PE-01"
                  className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.identification_code ? "border-red-500" : ""}`}
                  maxLength={10}
                />
                {errors.identification_code && (
                  <p className="text-sm text-red-500">
                    {errors.identification_code}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="scene_location">
                  Location of Collection at the Scene{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="scene_location"
                  value={formData.scene_location}
                  onChange={(e) =>
                    handleInputChange("scene_location", e.target.value)
                  }
                  placeholder="e.g., Kitchen, Living Room"
                  className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 ${errors.scene_location ? "border-red-500" : ""}`}
                />
                {errors.scene_location && (
                  <p className="text-sm text-red-500">
                    {errors.scene_location}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="collected_time">
                  Time of Collection <span className="text-red-500">*</span>
                </Label>
                <DateTimePicker
                  value={formData.collected_time_date}
                  onChange={(date) => {
                    setFormData((prev) => ({
                      ...prev,
                      collected_time_date: date,
                      collected_time: date ? date.toISOString() : "",
                    }))
                    if (errors.collected_time) {
                      setErrors((prev) => ({ ...prev, collected_time: "" }))
                    }
                  }}
                  placeholder="Select collection date and time"
                  className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.collected_time ? "border-red-500" : ""}`}
                  required
                />
                {errors.collected_time && (
                  <p className="text-sm text-red-500">
                    {errors.collected_time}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="collector_username">Collector</Label>
                <Select
                  value={formData.collector_username}
                  onValueChange={(value) =>
                    handleSelectChange(
                      "collector_username",
                      value === "none" ? "" : value
                    )
                  }
                >
                  <SelectTrigger
                    className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.collector_username ? "border-red-500" : ""}`}
                  >
                    <SelectValue
                      placeholder={
                        loadingUsers ? "Loading users..." : "Select a collector"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingUsers ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="ml-2">Loading users...</span>
                      </div>
                    ) : (
                      <>
                        <SelectItem value="none">
                          No collector selected
                        </SelectItem>
                        {users.map((user) => (
                          <SelectItem
                            key={user.user_name}
                            value={user.user_name}
                          >
                            {user.user_name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.collector_username && (
                  <p className="text-sm text-red-500">
                    {errors.collector_username}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="case_id">Associated Case</Label>
                <Select
                  value={formData.case_id}
                  onValueChange={(value) =>
                    handleSelectChange("case_id", value === "none" ? "" : value)
                  }
                >
                  <SelectTrigger
                    className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.case_id ? "border-red-500" : ""}`}
                  >
                    <SelectValue
                      placeholder={
                        loadingCases ? "Loading cases..." : "Select a case"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCases ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="ml-2">Loading cases...</span>
                      </div>
                    ) : (
                      <>
                        <SelectItem value="none">No case selected</SelectItem>
                        {cases.map((caseItem) => (
                          <SelectItem
                            key={caseItem.case_id}
                            value={caseItem.case_id}
                          >
                            {caseItem.case_id}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.case_id && (
                  <p className="text-sm text-red-500">{errors.case_id}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Detailed Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="scene_description">
                Scene Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="scene_description"
                value={formData.scene_description}
                onChange={(e) =>
                  handleInputChange("scene_description", e.target.value)
                }
                placeholder="Provide a detailed description of the evidence and scene..."
                rows={4}
                className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.scene_description ? "border-red-500" : ""}`}
              />
              {errors.scene_description && (
                <p className="text-sm text-red-500">
                  {errors.scene_description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Initial Condition */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Initial Condition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="initial_condition">
                Initial Condition <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="initial_condition"
                value={formData.initial_condition}
                onChange={(e) =>
                  handleInputChange("initial_condition", e.target.value)
                }
                placeholder="Describe the initial condition of the evidence..."
                rows={4}
                className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.initial_condition ? "border-red-500" : ""}`}
              />
              {errors.initial_condition && (
                <p className="text-sm text-red-500">
                  {errors.initial_condition}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Initial Preservation Measures */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Initial Preservation Measures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="preservation_measures">
                Preservation Measures <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="preservation_measures"
                value={formData.preservation_measures}
                onChange={(e) =>
                  handleInputChange("preservation_measures", e.target.value)
                }
                placeholder="Describe the preservation measures taken..."
                rows={4}
                className={`border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 ${errors.preservation_measures ? "border-red-500" : ""}`}
              />
              {errors.preservation_measures && (
                <p className="text-sm text-red-500">
                  {errors.preservation_measures}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isEditing ? "Update Evidence" : "Save Evidence"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PhysicalEvidenceForm
