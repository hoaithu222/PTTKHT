import { UserModel } from "../../models/UserModel.js";

export default async function findById(userId) {
    try {

        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}