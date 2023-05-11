import { MinUserModel } from "./MinUserModel"

export interface FollowInfo {
    followers: number,
    following: number
    followers_list: Array<MinUserModel>,
    following_list: Array<MinUserModel>
}