import { Suspense } from "react";
import FeedbackReportPage from "@/components/FeedbackReport/FeedbackreportPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
  <FeedbackReportPage></FeedbackReportPage>
    </Suspense>
  );
}