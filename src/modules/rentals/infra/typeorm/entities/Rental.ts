import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity("rentals")
class Rental {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({name: "car_id"})
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.created_at = new Date();
        };
    };
};

export { Rental };