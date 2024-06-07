export interface NotificationData {
    /** 通知ID */
    notificationId: number
    /** 通知类型 */
    type: string
    /** 通知标题 */
    title: string
    /** 通知内容 */
    content: string
    /** 通知时间 */
    releaseTime: string
    /** 通知用户 */
    userId: string
    /** 是否已读 */
    read: boolean
}

export interface FindNotificationRequestData {
    /** 学工号 */
    userId: string
}

export type FindNotificationResponseData = ApiResponseData<{ data: NotificationData[] }>