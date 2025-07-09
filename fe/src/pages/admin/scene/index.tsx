import InitialStatement from "./components/InitialStatements"
import ImagesAndVideos from "./components/SceneMedias"
import PreliminaryPhysicalEvidence from "./components/PhysicalEvidences"

const SceneInformationPage = () => {
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-6 text-[#1A2C47]">
        SCENE INFORMATION
      </h2>
      <InitialStatement />
      <ImagesAndVideos />
      <PreliminaryPhysicalEvidence />
    </>
  )
}

export default SceneInformationPage
