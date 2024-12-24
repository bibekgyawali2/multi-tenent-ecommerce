import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CommonEntity from "./common.entity";
import Store from "./store.entity";

@Entity({
    name: "user",
})
class User extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "name",
    })
    name!: string;

    @Column({
        name: "email",
        unique: true,
    })
    email!: string;

    @Column({
        name: "phone",
        unique: true,
    })
    phone?: string;

    @Column({
        name: "password",
    })
    password!: string;

    @Column({
        name: "roles",
        type: "simple-array",
        default: "admin",
    })
    roles!: string[];

    @OneToMany(() => Store, (store) => store.owner)
    stores!: Store[];
}

export default User;
