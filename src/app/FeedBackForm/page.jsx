import TaskFeedbackPage from "@/components/FeedbackForm/TaskFeedbackPage";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TaskFeedbackPage></TaskFeedbackPage>
        </Suspense>
    );
}