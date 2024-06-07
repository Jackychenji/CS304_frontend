import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import { LoginRequestData } from "@/api/types/login.ts";
import { UserData } from "@/api/types/user.ts";
import { loginApi } from "@/api/modules/User/login";
import store from "@/store";
import { ResetRequestData } from "@/api/types/resetPassword";
import { resetPasswordApi } from "@/api/modules/User/resetPassword";
import { RegisterRequestData } from "@/api/types/register";
import { registerApi } from "@/api/modules/User/register";
import { reloadAvatarApi } from "@/api/modules/User/reloadAvatar";
import { reloadInfoApi } from "@/api/modules/User/reloadInfo";
import { getAllUserApi } from "@/api/modules/User/getAllUser";


export const useUserStore = defineStore("user", () => {
    const userData = reactive<UserData>({})
    const allUserData = reactive<UserData[]>([])

    const showTab = ref(0)

    const goLogin = () => {
        showTab.value = 0
    }

    const goRegister = () => {
        showTab.value = 1
    }

    const goForget = () => {
        showTab.value = 2
    }

    /** 登录 */
    const login = async ({ userId, password }: LoginRequestData) => {
        const apiData = await loginApi({ userId, password })
        console.log(apiData)
        Object.assign(userData, apiData.data)
        console.log(userData)
    }
    /** 密码重置 */
    const resetPassword = async ({ userId, oldPassword, newPassword }: ResetRequestData) => {
        const apiData = await resetPasswordApi({ userId, oldPassword, newPassword })
        console.log(apiData)
    }

    /** 注册账号 */
    const register = async ({ email, role, userId, userName, password }: RegisterRequestData) => {
        const apiData = await registerApi({ email, role, userId, userName, password })
        console.log(apiData)
    }

    /** 更新头像 */
    const reloadAvatar = async (data: FormData) => {
        const apiData = await reloadAvatarApi(userData.userId, data)
        console.log(apiData)
    }

    /** 刷新信息 */
    const reloadInfo = async () => {
        const apiData = await reloadInfoApi(userData.userId)
        console.log(apiData)
        Object.assign(userData, apiData.data)
        console.log(userData)
    }

    /** 退出登录 */
    const logout = () => {
    }

    /** 获取所有用户 */
    const getAllUser = async () => {
        const apiData = await getAllUserApi()
        console.log(apiData)
        Object.assign(allUserData, apiData.data)
        console.log(allUserData)
    }

    return { userData, allUserData, showTab, login, logout, resetPassword, register, reloadAvatar, reloadInfo, goLogin, goRegister, goForget, getAllUser }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}
