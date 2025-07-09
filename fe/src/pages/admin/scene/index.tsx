import React, { useState } from "react"
import Sidebar from "./components/SideBar"
import ImagesAndVideos from "./components/SceneMedias"
import PreliminaryPhysicalEvidence from "./components/PhysicalEvidences"
import SceneMediasForm from "./components/SceneMedias/SceneMediasForm";

import InitialStatementsForm from "./components/InitialStatements/InitialStatementsForm";
import InitialStatement from "./components/InitialStatements";

const SceneInformationPage = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  // New state to control detail form globally
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [mediaFormData, setMediaFormData] = useState(null);
  const [mediaFormMode, setMediaFormMode] = useState<'add' | 'view' | 'edit'>('view');
  const [showInitialForm, setShowInitialForm] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any>(null);
  const [initialFormMode, setInitialFormMode] = useState<'add' | 'view' | 'edit'>('view');

  // Handler to open media form from ImagesAndVideos
  const handleOpenMediaForm = (data: any, mode: 'add' | 'view' | 'edit' = 'view') => {
    setActiveMenu('imagesandvideos');
    setMediaFormData(data);
    setMediaFormMode(mode);
    setShowMediaForm(true);
  };
  // Handler to close media form
  const handleCloseMediaForm = () => {
    setShowMediaForm(false);
    setMediaFormData(null);
  };

  const handleOpenInitialForm = (data: any, mode: 'add' | 'view' | 'edit' = 'view') => {
    setActiveMenu('initialstatement');
    setInitialFormData(data);
    setInitialFormMode(mode);
    setShowInitialForm(true);
  };
  const handleCloseInitialForm = () => {
    setShowInitialForm(false);
    setInitialFormData(null);
  };

  // If media form is open, show only it
  if (showMediaForm) {
    return (
      <div className="flex min-h-screen bg-[#E9DADA]">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowAdd={setShowAdd}
          showAdd={showAdd}
        />
        <div className="flex-1 bg-white rounded-xl shadow-md p-8 mx-auto my-4 max-w-4xl">
          <SceneMediasForm
            data={mediaFormData}
            mode={mediaFormMode}
            onBack={handleCloseMediaForm}
            onSave={handleCloseMediaForm}
            onEdit={() => setMediaFormMode('edit')}
          />
        </div>
      </div>
    );
  }

  if (showInitialForm) {
    return (
      <div className="flex min-h-screen bg-[#E9DADA]">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowAdd={setShowAdd}
          showAdd={showAdd}
        />
        <div className="flex-1 bg-white rounded-xl shadow-md p-8 mx-auto my-4 max-w-4xl">
          <InitialStatementsForm
            data={initialFormData}
            mode={initialFormMode}
            onBack={handleCloseInitialForm}
            onSave={handleCloseInitialForm}
            onEdit={() => setInitialFormMode('edit')}
          />
        </div>
      </div>
    );
  }

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
        {activeMenu === "imagesandvideos" && <ImagesAndVideos onOpenDetail={handleOpenMediaForm} />}
        {activeMenu === "initialstatement" && <InitialStatement onOpenDetail={handleOpenInitialForm} />}
        {activeMenu === "preliminary" && <PreliminaryPhysicalEvidence />}
        {!activeMenu && (
          <>
            <h2 className="text-center text-lg font-bold mb-6 text-[#1A2C47]">
              SCENE INFORMATION
            </h2>
            <InitialStatement onOpenDetail={handleOpenInitialForm} />
            <ImagesAndVideos onOpenDetail={handleOpenMediaForm} />
            <PreliminaryPhysicalEvidence />
          </>
        )}
      </div>
    </div>
  )
}

export default SceneInformationPage
