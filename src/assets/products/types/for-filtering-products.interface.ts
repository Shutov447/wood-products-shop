import { IProduct } from './product.interface';

interface IFilteringCharacteristic {
    name: string;
    values: string[];
}

export interface IForFilteringProducts {
    [category: IProduct['category']]: IFilteringCharacteristic[];
}

interface IMaxRange {
    title: string;
    max: number;
}

export interface IResultFilterData {
    characteristics: IFilteringCharacteristic[];
    ranges: IMaxRange[];
}
