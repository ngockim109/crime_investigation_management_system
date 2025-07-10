import { useParams, useNavigate } from "react-router-dom";
import InitialStatementsForm from "../initial-statement-management/components/InitialStatementsForm";
import { casesApi } from "@/api/cases";
import { useQuery } from "@tanstack/react-query";

const InitialStatementUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["initial-statement", id],
    queryFn: () => casesApi.getInitialStatementById(id!).then(res => res.data),
    enabled: !!id,
  });
  return (
    <InitialStatementsForm
      data={data}
      onBack={() => navigate(-1)}
      onSave={() => navigate(-1)}
      mode="edit"
    />
  );
};
export default InitialStatementUpdatePage;
