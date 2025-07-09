import ImagesAndVideosManagementPage from "@/pages/images-and-videos/images-and-videos-management"
import InitialStatementManagementPage from "../initial-statements/initial-statement-management"
import PhysicalEvidenceManagement from "../physical-evidences/physical-evidence-management"

const SceneInformationPage = () => {
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-6 text-[#1A2C47]">
        SCENE INFORMATION
      </h2>
      <InitialStatementManagementPage />
      <ImagesAndVideosManagementPage />
      <PhysicalEvidenceManagement />
    </>
  )
}

export default SceneInformationPage
