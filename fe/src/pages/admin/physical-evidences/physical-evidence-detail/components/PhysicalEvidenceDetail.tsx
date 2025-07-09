import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  User,
  FileText,
} from "lucide-react"
import type { PhysicalEvidence } from "@/types/physical-evidence.interface"
import { formatDateTime } from "@/utils/physical-evidence"

interface PhysicalEvidenceDetailProps {
  evidence: PhysicalEvidence
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

const PhysicalEvidenceDetail = ({
  evidence,
  onBack,
  onEdit,
  onDelete,
}: PhysicalEvidenceDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div>
            <Button
              variant="outline"
              onClick={onBack}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to List
            </Button>
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900">
              Preliminary Physical Evidence Information:{" "}
              {evidence.identification_code}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 mt-1">
            Created on {formatDateTime(evidence.created_at)}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onEdit}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-900">
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium">
                  Temporary Identification Code:
                </span>
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-200"
                >
                  {evidence.identification_code}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-medium">
                  Location of Collection at the Scene:
                </span>
                <span>{evidence.scene_location}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Time of Collection:</span>
                <span>{formatDateTime(evidence.collected_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Collector:</span>
                <span>{evidence.collector_username || "N/A"}</span>
              </div>
            </div>
          </div>

          {evidence.case_id && (
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Associated Case:</span>
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-200"
                >
                  {evidence.case_id}
                </Badge>
              </div>
            </div>
          )}
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
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-700 whitespace-pre-wrap">
              {evidence.scene_description ||
                "No detailed description provided."}
            </p>
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
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-700 whitespace-pre-wrap">
              {evidence.initial_condition ||
                "No initial condition information provided."}
            </p>
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
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-700 whitespace-pre-wrap">
              {evidence.preservation_measures ||
                "No preservation measures information provided."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status and Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-900">
            Other Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={evidence.is_deleted ? "destructive" : "default"}
                  className={
                    evidence.is_deleted ? "" : "bg-green-100 text-green-800"
                  }
                >
                  {evidence.is_deleted ? "Deleted" : "Active"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Created:</span>
                <span className="text-gray-600">
                  {formatDateTime(evidence.created_at)}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Evidence ID:</span>
                <span className="text-gray-600 font-mono text-sm">
                  {evidence.physical_evidence_id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Last Updated:</span>
                <span className="text-gray-600">
                  {formatDateTime(evidence.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PhysicalEvidenceDetail
