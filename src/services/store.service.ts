import { Repository } from "typeorm";
import AppDataSource from "../config/database.config";
import Store from "../entities/store.entity";
import HttpException from "../utils/HttpException";
import { Body } from "tsoa";
import { createStoreDTO } from "../dtos/store.dto";
import { subdomainNameGenerator } from "./utils/subdomainGenerator.service";
import messages from "../constants/messages";
import User from "../entities/user.entity";
import BcryptService from "./utils/bcrypt.service";

class StoreService {
    private storeRepository: Repository<Store>;
    private userRepository: Repository<User>;

    constructor() {
        this.storeRepository = AppDataSource.getRepository(Store);
        this.userRepository = AppDataSource.getRepository(User);

    }

    async createStore(@Body() storeData: createStoreDTO): Promise<{ user: User; store: Store }> {
        console.log(":::::::::::::::::::::::::::::::::::::::")
        const { storeName, businessCategory, contactNumber, storeAddress, contactEmailAddress } = storeData;
        const { name, email, password } = storeData;

        const isExists = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (isExists) {
            throw HttpException.badRequest(messages["emailAlreadyExists"]);
        }

        if (!storeName || !businessCategory || !contactNumber) {
            throw HttpException.badRequest("All fields are required");
        }

        const hashedPassword = await BcryptService.hash(password);

        const domainName = subdomainNameGenerator(storeName);

        const store = this.storeRepository.create({
            storeName,
            businessCategory,
            contactNumber,
            storeAddress,
            contactEmailAddress,
            subdomain: domainName,
        });

        const savedStore = await this.storeRepository.save(store);

        const user = this.userRepository.create({
            email,
            name,
            password: hashedPassword,
            phone: contactNumber,
            roles: "admin",
            store: savedStore,
        });

        const savedUser = await this.userRepository.save(user);

        return { user: savedUser, store: savedStore };
    }

}

export default StoreService;
