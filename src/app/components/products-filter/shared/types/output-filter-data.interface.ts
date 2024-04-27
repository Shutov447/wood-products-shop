import { IProduct } from '../../../../../assets/products/types/product.interface';
import { IChosenData } from '../../../custom-input/shared/types/characteristic-data.interface';
import { IOutputRangeData } from '../../../custom-input/shared/types/input-range-data.interface';

export interface IOutputFilterData {
    category: IProduct['category'];
    ranges: IOutputRangeData[];
    choices: IChosenData[];
}
