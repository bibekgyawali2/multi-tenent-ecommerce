import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


class CommonEntity {


    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    UpdatedAt!: Date;


}


export default CommonEntity;