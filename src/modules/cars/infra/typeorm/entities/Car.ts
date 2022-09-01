import { v4 as uuidV4 } from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity("cars")
class Car {
    id?: string;
    name: string;
    description: string;
    daily_rate: number;
    available: boolean;
    license_plate: string;
    fine_amout: number;
    brand: string
    created_at: Date;
    category_id: string;
    constructor() {
        if(!this.id){
            this.id = uuidV4();
            this.available = true;
            this.created_at = new Date();
        }
    }
};

export {Car};