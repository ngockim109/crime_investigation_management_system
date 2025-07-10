import { useParams, useNavigate } from "react-router-dom";
import { casesApi } from "@/api/cases";
import { useQuery } from "@tanstack/react-query";
import SceneMediasForm from "../scenes-media-management/components/SceneMediasForm";

const SceneMediasDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["scene-media", id],
    queryFn: () => casesApi.getSceneMediaById(id!).then(res => res.data),
    enabled: !!id,
  });
  return (
    <SceneMediasForm
      data={data}
      onBack={() => navigate(-1)}
      onSave={() => navigate(-1)}
      mode="view"
    />
  );
};
export default SceneMediasDetailPage;
