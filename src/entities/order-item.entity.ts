import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Order from "./order.entity";
import Product from "./products.entity";

@Entity()
class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "quantity",
        type: "int"
    })
    quantity!: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: "CASCADE"
    })
    order!: Order;

    @ManyToOne(() => Product, {
        onDelete: "SET NULL",
        nullable: true
    })
    product!: Product;
}

export default OrderItem;