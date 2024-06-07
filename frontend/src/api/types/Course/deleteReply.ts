import {ReplyRequestData} from "@/api/types/Course/getReply.ts";

export type deleteReplyResponseData = ApiResponseData<{
    data:ReplyRequestData;
    code:number;
    msg:string;
}>

