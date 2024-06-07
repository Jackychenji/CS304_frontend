import { UserData } from './user'

export interface RegisterRequestData {
    /** 邮箱 */
    email: string
    /** 账号角色 */
    role: string
    /** 学工号 */
    userId: string
    /** 用户名 */
    userName: string
    /** 密码 */
    password: string
}

export type RegisterResponseData = ApiResponseData<{ data: UserData }>