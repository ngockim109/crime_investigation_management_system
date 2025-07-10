import { useParams, useNavigate } from "react-router-dom";
import InitialStatementsForm from "../initial-statement-management/components/InitialStatementsForm";
import { casesApi } from "@/api/cases";
import { useQuery } from "@tanstack/react-query";

const InitialStatementDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: statementData } = useQuery({
    queryKey: ["initial-statement", id],
    queryFn: () => casesApi.getInitialStatementById(id!).then(res => res.data),
    enabled: !!id,
  });


  const { data: partiesData } = useQuery({
    queryKey: ["initial-statement/parties", id],
    queryFn: () => casesApi.getPartiesById(id!).then(res => res.data),
    enabled: !!id,
  });

  const mergedData = {
    ...statementData,
    ...partiesData,
  };
  console.log("mergedData", mergedData)

  return (
    <InitialStatementsForm
      data={mergedData}
      onBack={() => navigate(-1)}
      onSave={() => navigate(-1)}
      mode="view"
    />
  );
};
export default InitialStatementDetailPage;
