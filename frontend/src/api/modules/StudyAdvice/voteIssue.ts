import { request } from "@/utils/service.ts"
import {IssueVoteResponseData,IssueVoteRequestData} from "@/api/types/StudyAdvice/voteIssue.ts"

export function IssueVoteApi(vote: IssueVoteRequestData) {
    return request<IssueVoteResponseData>({
        url: `/issue/vote`,
        method: "post",
        data:vote
    })
}

