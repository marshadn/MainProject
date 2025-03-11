import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

function SkillsAnalysis() {
  const location = useLocation();
  const response = location.state?.response || "No analysis available.";

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Skill Analysis Report</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{response}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SkillsAnalysis;
