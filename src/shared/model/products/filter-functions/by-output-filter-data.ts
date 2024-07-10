/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { ICharacteristic, IProduct } from '@shared/api';
import { IChosenData, IOutputRangeData } from '@shared/components';

export function filterProductByFilterData(
    product: IProduct,
    characteristics: (IChosenData | IOutputRangeData)[],
): boolean {
    const filteredProduct: boolean[] = [];

    for (const key in product) {
        const formattedKey = key.toLowerCase();

        for (const characteristic of characteristics) {
            const newProduct = product as Record<string, any>;
            const value = newProduct[key];

            const rangeCharacteristic = characteristic as IOutputRangeData;

            if (formattedKey === characteristic.title?.toLowerCase()) {
                const isCorrespondsToRange =
                    typeof value === 'number' &&
                    value >= rangeCharacteristic.from &&
                    value <= rangeCharacteristic.to;

                filteredProduct.push(isCorrespondsToRange);

                continue;
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
