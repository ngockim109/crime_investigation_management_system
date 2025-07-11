import InitialStatementsForm from "../initial-statement-management/components/InitialStatementsForm";
import { useNavigate } from "react-router-dom";

const InitialStatementAddPage = () => {
  const navigate = useNavigate();
  return (
    <InitialStatementsForm
      onBack={() => navigate(-1)}
      onSave={() => navigate(-1)}
      mode="add"
    />
  );
};
export default InitialStatementAddPage;
