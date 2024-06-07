import { UserData } from './user'

export interface LoginRequestData {
    /** 学工号 */
    userId: string
    /** 密码 */
    password: string
}

export type LoginResponseData = ApiResponseData<{ data: UserData }>