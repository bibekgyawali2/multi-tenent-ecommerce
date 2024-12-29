import { Repository } from "typeorm";
import AppDataSource from "../../config/database.config";
import User from "../../entities/user.entity";
import HttpException from "../../utils/HttpException";

class GetStoreIdFromUserId {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getShopId(userId: string): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["store"],
        });

        if (!user || !user.store) {
            throw HttpException.notFound("Store not found for this user");
        }

        return user.store.id;
    }
}

const getShopIdFromUserId = new GetStoreIdFromUserId();
export default getShopIdFromUserId;
