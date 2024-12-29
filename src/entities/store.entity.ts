import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CommonEntity from "./common.entity";
import User from "./user.entity";
import Product from "./products.entity";
import Category from "./categories.entity";
import Order from "./order.entity";

@Entity({
    name: "store",
})
class Store extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "store_name",
    })
    storeName!: string;

    @Column({
        name: "business_category",
    })
    businessCategory!: string;

    @Column({
        name: "contact_number",
    })
    contactNumber!: string;

    @Column({
        name: "store_address",
        nullable: true,
    })
    storeAddress?: string;

    @Column({
        name: "contact_email_address",
        unique: true,
    })
    contactEmailAddress?: string;

    @Column({
        name: "subdomain",
        unique: true,
    })
    subdomain!: string;

    @OneToMany(() => User, (user) => user.store)
    users!: User[];

    @OneToMany(() => Product, (product) => product.store)
    products?: Product[];

    @OneToMany(() => Category, (category) => category.store)
    categories?: Category[];

    @OneToMany(() => Order, (order) => order.store)
    orders?: Order[];
}

export default Store;
