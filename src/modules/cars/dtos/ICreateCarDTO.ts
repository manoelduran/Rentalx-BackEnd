

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number
    license_plate: string;
    fine_amount: number;
    brand: string;
    created_at: Date;
    category_id: string;
};

export {ICreateCarDTO};