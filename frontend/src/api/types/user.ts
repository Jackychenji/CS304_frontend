export interface UserData {
    /** 学工号 */
    userId: string
    /** 用户名 */
    userName: string
    /** 密码 */
    password: string
    /** 角色 */
    role: string
    /** 邮箱 */
    email: string
    /** 头像 */
    avatar: string | null
    /** 关注课程 */
    followCourses: string[]
    /** 推荐课程 */
    recommendClasses: string[]
    /** 不推荐课程 */
    unrecommendClasses: string[]
}

export type GetAllUserResponseData = ApiResponseData<{ data: UserData[] }>