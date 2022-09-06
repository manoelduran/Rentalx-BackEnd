import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity("cars")
class Car {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}], // Coluna dentro da tabela de relacionamento que referencia a tabela/ classe que ela está registrada
        inverseJoinColumns: [{name: "specification_id"}] // referencia a outra tabela que ela se relaciona
    })
    specifications: Specification[];

    @Column()
    category_id: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        };
    };
};

export { Car };