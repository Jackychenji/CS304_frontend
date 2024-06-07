import {DiscussionRequestData} from "@/api/types/StudyAdvice/getDiscussion.ts";

export type deleteDiscussionResponseData = ApiResponseData<{
    data:DiscussionRequestData;
    code:number;
    msg:string;
}>

