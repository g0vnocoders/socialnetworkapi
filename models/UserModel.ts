import { MinUserModel } from './MinUserModel';
export interface UserModel extends MinUserModel {
    followers: number,
    following: number,
    nickName: string,
    backgroundURL: string,
    description: string
}