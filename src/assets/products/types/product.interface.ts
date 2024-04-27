export interface ICharacteristic {
    value: string;
    description: string;
}

export interface IProduct {
    url: string;
    vendor_code: number;
    name: string;
    price: number;
    rating: number;
    description: string;
    сharacteristics: ICharacteristic[];
    photos: string[];
    category: string;
}
