import { ProductsActions } from '../products.actions';
import { productsReducer } from '../products.reducer';
import { IProductsState, productsInitialState } from '../products.state';

describe('productsReducer', () => {
    const products = [
        {
            url: 'testUrl1',
            vendor_code: 1,
            name: 'testName1',
            price: 2,
            rating: 3,
            description: 'testDescription1',
            characteristics: [
                { value: 'testValue1', description: 'testDescription1' },
            ],
            photos: ['tesPhoto1', 'testPhoto2', 'testPhoto3'],
            category: 'testCategory1',
        },
        {
            url: 'testUrl2',
            vendor_code: 1,
            name: 'testName2',
            price: 2,
            rating: 3,
            description: 'testDescription2',
            characteristics: [
                { value: 'testValue2', description: 'testDescription2' },
            ],
            photos: ['tesPhoto4', 'testPhoto5', 'testPhoto6'],
            category: 'testCategory2',
        },
        {
            url: 'testUrl3',
            vendor_code: 1,
            name: 'testName3',
            price: 10,
            rating: 3,
            description: 'testDescription3',
            characteristics: [
                { value: 'testValue3', description: 'testDescription3' },
            ],
            photos: ['tesPhoto7', 'testPhoto8', 'testPhoto9'],
            category: 'testCategory3',
        },
        {
            url: 'testUrl3',
            vendor_code: 1,
            name: 'testName3',
            price: 100,
            rating: 3,
            description: 'testDescription3',
            characteristics: [
                { value: 'testChoice23', description: 'testTitle1' },
            ],
            photos: ['tesPhoto7', 'testPhoto8', 'testPhoto9'],
            category: 'testCategory3',
        },
        {
            url: 'testUrl3',
            vendor_code: 1,
            name: 'testName3',
            price: 150,
            rating: 3,
            description: 'testDescription3',
            characteristics: [
                { value: 'testChoice1', description: 'testTitle1' },
            ],
            photos: ['tesPhoto7', 'testPhoto8', 'testPhoto9'],
            category: 'testCategory3',
        },
    ];
    const productsInitialStateMock: IProductsState = {
        products,
        categories: ['testCategory1', 'testCategory2'],
        filteredProducts: [products[0]],
        currentChunk: [products[1], products[2]],
        currentProduct: products[2],
        productsNames: [products[1].name, products[2].name],
    };

    describe('unknown action', () => {
        it('должен вернуть начальное состояние', () => {
            const action = {
                type: 'Unknown',
            };
            const state = productsReducer(productsInitialState, action);

            expect(state).toEqual(productsInitialState);
        });
    });

    describe('ProductsActions.addProducts', () => {
        it('должен обновить товары и все уникальные категории', () => {
            const testCategories = [
                'testCategory1',
                'testCategory2',
                'testCategory3',
            ];
            const action = ProductsActions.addProducts({
                products,
            });
            const state = productsReducer(productsInitialState, action);

            expect(state.products).toEqual(products);
            expect(state.products).not.toEqual(productsInitialState.products);
            expect(state.categories).toEqual(testCategories);
        });
    });

    describe('ProductsActions.filterByCategoryAndAmount', () => {
        it('должен отфильтровать по запрашиваемым количеству и категории', () => {
            const action = ProductsActions.filterByCategoryAndAmount({
                category: 'testCategory3',
                amount: 2,
            });
            const state = productsReducer(productsInitialStateMock, action);

            expect(state.filteredProducts).toHaveLength(2);
            expect(state.filteredProducts).toEqual([products[2], products[3]]);
            expect(state.filteredProducts).not.toEqual(
                productsInitialState.filteredProducts,
            );
        });

        it('должен вернуть пустой отфильтрованный массив', () => {
            let action = ProductsActions.filterByCategoryAndAmount({
                category: 'testCategory1',
                amount: Infinity,
            });
            let state = productsReducer(productsInitialStateMock, action);

            expect(state.filteredProducts).toHaveLength(0);
            expect(state.filteredProducts).not.toEqual(
                productsInitialStateMock.filteredProducts,
            );

            action = ProductsActions.filterByCategoryAndAmount({
                category: 'testCategory1',
                amount: NaN,
            });
            state = productsReducer(productsInitialStateMock, action);

            expect(state.filteredProducts).toHaveLength(0);
            expect(state.filteredProducts).not.toEqual(
                productsInitialStateMock.filteredProducts,
            );
        });
    });

    describe('ProductsActions.addProductsNames', () => {
        it('должен обновить имена товаров', () => {
            const productsNames = [products[1].name, products[2].name];
            const action = ProductsActions.addProductsNames({
                productsNames,
            });
            const state = productsReducer(productsInitialState, action);

            expect(state.productsNames).toEqual(productsNames);
            expect(state.productsNames).not.toEqual(
                productsInitialState.productsNames,
            );
        });
    });

    describe('ProductsActions.setCurrentProductByName', () => {
        it('должен обновить текущий товар по имени', () => {
            const productName = products[1].name;
            const action = ProductsActions.setCurrentProductByName({
                productName,
            });
            const state = productsReducer(productsInitialStateMock, action);

            expect(state.currentProduct).toEqual(products[1]);
            expect(state.currentProduct).not.toEqual(
                productsInitialStateMock.currentProduct,
            );
        });
    });

    describe('ProductsActions.setCurrentChunk', () => {
        it('должен обновить текущий чанк', () => {
            const currentChunk = [products[0], products[3]];
            const action = ProductsActions.setCurrentChunk({
                currentChunk,
            });
            const state = productsReducer(productsInitialStateMock, action);

            expect(state.currentChunk).toEqual(currentChunk);
            expect(state.currentChunk).not.toEqual(
                productsInitialStateMock.currentChunk,
            );
        });
    });

    describe('ProductsActions.filterByOutputFilterData', () => {
        it('должен отфильтровать товары', () => {
            const outputFilterData = {
                category: 'testCategory3',
                ranges: [
                    {
                        title: 'price',
                        from: 100,
                        to: 200,
                    },
                ],
                choices: [
                    {
                        title: 'testTitle1',
                        choices: ['testChoice1', 'testChoice2'],
                    },
                ],
            };
            const action =
                ProductsActions.filterByOutputFilterData(outputFilterData);
            const state = productsReducer(productsInitialStateMock, action);

            expect(state.filteredProducts).toHaveLength(1);
            expect(state.filteredProducts).toEqual([products[4]]);
            expect(state.filteredProducts).not.toEqual(
                productsInitialStateMock.filteredProducts,
            );
        });
    });
});
