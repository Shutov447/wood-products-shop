import { IProduct } from './product.interface';
import { IChosenData, IOutputRangeData } from '../../../components/';

export interface IOutputFilterData {
    category: IProduct['category'];
    ranges: IOutputRangeData[];
    choices: IChosenData[];
}
