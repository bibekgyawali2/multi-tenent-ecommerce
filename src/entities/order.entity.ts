import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import Store from "./store.entity";
import OrderItem from "./order-item.entity";

@Entity({
    name: "orders"
})
class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "order_date",
        type: "varchar",
        nullable: true,
    })
    orderDate?: Date;

    @Column({
        name: "customer_name",
        type: "varchar",
        length: 255,
    })
    customerName!: string;

    @Column({
        name: "customer_email",
        type: "varchar",
        length: 255,
    })
    customerEmail!: string;

    @Column({
        name: "customer_phone",
        type: "varchar",
        length: 15,
    })
    customerPhone!: string;

    @Column({
        name: "shipping_address",
        type: "text",
    })
    shippingAddress!: string;

    @Column({
        name: "shipping_city",
        type: "varchar",
        length: 100,
    })
    shippingCity!: string;

    @Column({
        name: "shipping_region",
        type: "varchar",
        length: 100,
    })
    shippingRegion!: string;

    @Column({
        name: "shipping_country",
        type: "varchar",
        length: 100,
    })
    shippingCountry!: string;

    @Column({
        name: "shipping_postal_code",
        type: "varchar",
        length: 20,
    })
    shippingPostalCode!: string;

    @Column({
        name: "payment_method",
        type: "varchar",
        length: 50,
    })
    paymentMethod!: string;

    @Column({
        name: "payment_status",
        type: "varchar",
        length: 50,
    })
    paymentStatus!: string;

    @Column({
        name: "payment_date",
        type: "timestamp",
        nullable: true,
    })
    paymentDate?: Date;

    @Column({
        name: "payment_amount",
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: true,
    })
    paymentAmount?: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        cascade: true
    })
    orderItems!: OrderItem[];

    @ManyToOne(() => Store, (store) => store.orders, {
        onDelete: "CASCADE",
        nullable: false
    })
    storeId!: string;
}

export default Order;