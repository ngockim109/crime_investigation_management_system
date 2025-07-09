import React, { useState } from "react"
import Sidebar from "./components/SideBar"
import InitialStatement from "./components/InitialStatements"
import ImagesAndVideos from "./components/SceneMedias"
import PreliminaryPhysicalEvidence from "./components/PhysicalEvidences"

const SceneInformationPage = () => {
  const [activeMenu, setActiveMenu] = useState("")
  const [showAdd, setShowAdd] = useState(false)

   activeMenu === "initialstatement" && showAdd

  return (
    <div className="flex min-h-screen bg-[#E9DADA]">
      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowAdd={setShowAdd}
        showAdd={showAdd}
      />

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-8 mx-auto my-4 max-w-4xl">
        {activeMenu === "imagesandvideos" && <ImagesAndVideos />}
        {activeMenu === "initialstatement" && <InitialStatement />}
        {activeMenu === "preliminary" && <PreliminaryPhysicalEvidence />}
        {!activeMenu && (
          <>
            <h2 className="text-center text-lg font-bold mb-6 text-[#1A2C47]">
              SCENE INFORMATION
            </h2>
            <InitialStatement />
            <ImagesAndVideos />
            <PreliminaryPhysicalEvidence />
          </>
        )}
      </div>
    </div>
  )
}

export default SceneInformationPage
