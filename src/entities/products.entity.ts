import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./categories.entity";
import Store from "./store.entity";
import CommonEntity from "./common.entity";

@Entity({
    name: "products",
})
class Product extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "product_name",
    })
    productName!: string;


    @Column({
        name: "product_description",
    })
    description!: string;

    @Column({
        name: "product_image",
    })
    productImage!: string;

    @Column({
        name: "product_price",
    })
    productPrice!: number;

    @Column({
        name: "crossed_price",
    })
    crossedPrice?: number;

    @Column({
        name: "stock",
    })
    stock!: number;

    @Column({
        name: "status",
        default: "active",
        enum: ["active", "draft", "inactive"],
    })
    status!: string;

    @Column({
        name: "product_sku",
    })
    product_sku?: string;

    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: "CASCADE",
    })
    category?: Category;

    @ManyToOne(() => Store, (store) => store.products, {
        onDelete: "CASCADE",
        nullable: false
    })
    store!: Store;
}

export default Product;