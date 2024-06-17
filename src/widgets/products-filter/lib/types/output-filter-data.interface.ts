import { IProduct } from '@assets/products/types/product.interface';
import { IChosenData, IOutputRangeData } from '@shared/components';

export interface IOutputFilterData {
    category: IProduct['category'];
    ranges: IOutputRangeData[];
    choices: IChosenData[];
}
