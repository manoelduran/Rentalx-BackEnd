import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
class Rental {

    @PrimaryColumn()
    id: string;


    car_id: string;


    user_id: string;

    @CreateDateColumn()
    start_date: Date;

    @CreateDateColumn()
    end_date: Date;

    @CreateDateColumn()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.created_at = new Date();
        };
    };
};

export { Rental };