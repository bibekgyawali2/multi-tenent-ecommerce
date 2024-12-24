import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./products.entity";
import Store from "./store.entity";

@Entity({
    name: "categories",
})
class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "category_name",
    })
    categoryName!: string;

    @Column({
        name: "category_description",
    })
    categoryDescription?: string;

    @Column({
        name: "category_image",
    })
    categoryImage!: string;

    @ManyToOne(() => Store, (store) => store.categories, {
        onDelete: "CASCADE",
        nullable: false,
    })
    store!: Store;

    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    products?: Product[];
}

export default Category;
