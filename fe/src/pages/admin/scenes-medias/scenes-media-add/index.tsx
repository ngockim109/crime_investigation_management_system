import { useNavigate } from "react-router-dom";
import SceneMediasForm from "../scenes-media-management/components/SceneMediasForm";

const SceneMediasAddPage = () => {
  const navigate = useNavigate();
  return (
    <SceneMediasForm
      onBack={() => navigate(-1)}
      onSave={() => navigate(-1)}
      mode="add"
    />
  );
};
export default SceneMediasAddPage;
