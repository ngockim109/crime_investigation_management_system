import InitialStatementManagement from "../initial-statements/initial-statement-management"
import PhysicalEvidenceManagement from "../physical-evidences/physical-evidence-management"
import SceneMediasManagement from "../scenes-medias/scenes-media-management"

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-blue-100">
    {children}
  </div>
);

const SceneInformationPage = () => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-10 text-[#1A2C47] tracking-wide uppercase">
        Scene Information
      </h2>
      <Section >
        <InitialStatementManagement />
      </Section>
      <Section>
        <SceneMediasManagement />
      </Section>
      <Section>
        <PhysicalEvidenceManagement />
      </Section>
    </div>
  )
}

export default SceneInformationPage