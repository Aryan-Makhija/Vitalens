import LatestReportPage from "@/components/ReportDetailsPage/ReportDetailsPage";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LatestReportPage></LatestReportPage>
        </Suspense>
    );
}