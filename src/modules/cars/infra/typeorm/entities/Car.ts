import { v4 as uuidV4 } from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity("cars")
class Car {
    id: string;
    name: string;
    description: string;
    daily_rate: number;
    available: boolean;
    license_plate: string;
    fine_amout: number;
    brand: string
    created_at: Date;
    category_id: string
};

export {Car};