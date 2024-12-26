import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
        type: "simple-enum",
        default: "admin",
        enum: ["admin", "manager"],
    })
    roles!: string;

    @ManyToOne(() => Store, (store) => store.users, {
        onDelete: "CASCADE",
    })
    store!: Store;
}

export default User;
