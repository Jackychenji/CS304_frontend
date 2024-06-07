import { UserData } from './user'

export interface ResetRequestData {
    /** 学工号 */
    userId: string
    /** 旧密码 */
    oldPassword: string
    /** 新密码 */
    newPassword: string
}

export type ResetResponseData = ApiResponseData<{ data: UserData }>