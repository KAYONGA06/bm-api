
import { UserModel, User } from "./user";
import { Sequelize } from "sequelize";
interface Modals {
    User: typeof User
}
export const AllModal = (sequelize: Sequelize): Modals => {
    return {
        User: UserModel(sequelize)
    }
}
