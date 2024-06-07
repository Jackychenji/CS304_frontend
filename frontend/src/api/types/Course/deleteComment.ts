import {CommentRequestData} from "@/api/types/Course/getComment.ts";

export type deleteCommentResponseData = ApiResponseData<{
    data:CommentRequestData;
    code:number;
    msg:string;
}>

