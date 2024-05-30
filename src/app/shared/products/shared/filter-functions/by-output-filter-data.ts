import { concat } from 'lodash';
import {
    ICharacteristic,
    IProduct,
} from '../../../../../assets/products/types/product.interface';
import { IOutputFilterData } from '../../../../components/products-filter/shared/types/output-filter-data.interface';
import { IProductsFilterFn } from '../types/products-filter.interface';
import { IChosenData } from '../../../../components/custom-input/shared/types/characteristic-data.interface';
import { IOutputRangeData } from '../../../../components/custom-input/shared/types/input-range-data.interface';

function filterProduct(
    product: IProduct,
    characteristics: (IChosenData | IOutputRangeData)[],
): boolean | undefined {
    const filteredProduct: boolean[] = [];

    for (const key in product) {
        const formattedKey = key.toLowerCase();

        bp: for (const characteristic of characteristics) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newProduct = product as Record<string, any>;
            const value = newProduct[key];

            const rangeCharacteristic = characteristic as IOutputRangeData;

            if (formattedKey === characteristic.title?.toLowerCase()) {
                const isCorrespondsToRange =
                    typeof value === 'number' &&
                    value >= rangeCharacteristic.from &&
                    value <= rangeCharacteristic.to;

                filteredProduct.push(isCorrespondsToRange);

                continue bp;
            }

            if (formattedKey === 'characteristics') {
                const nestedCharacteristics = newProduct[
                    key
                ] as ICharacteristic[];
                const chosenCharacteristic = characteristic as IChosenData;
                const isEmptyChoices: boolean[] = [];

                for (const keyOfChoices in chosenCharacteristic) {
                    if (keyOfChoices === 'choices') {
                        const choices = chosenCharacteristic[
                            keyOfChoices
                        ] as string[];

                        isEmptyChoices.push(Boolean(choices.length));
                    }
                }

                if (isEmptyChoices.includes(true)) {
                    const values: boolean[] = [];

                    for (const nestedCharacteristic of nestedCharacteristics) {
                        const haveChoice =
                            nestedCharacteristic.description ===
                                chosenCharacteristic.title &&
                            chosenCharacteristic.choices.includes(
                                nestedCharacteristic.value,
                            );

                        values.push(haveChoice);
                    }

                    filteredProduct.push(values.includes(true));
                }
            }
        }
    }

    return !filteredProduct.includes(false);
}

export const filterByOutputFilterData: IProductsFilterFn<IOutputFilterData> = (
    products: IProduct[],
    filterData: IOutputFilterData,
): IProduct[] => {
    const characteristics = concat<IChosenData | IOutputRangeData>(
        filterData.choices,
        filterData.ranges,
    );

    products = products.filter((product) => {
        const isCategoryMatch = product.category === filterData.category;

        return isCategoryMatch && filterProduct(product, characteristics);
    });

    return products;
};
