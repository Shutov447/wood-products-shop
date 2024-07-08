import {
    selectAllProducts,
    selectCategories,
    selectCurrentChunkProducts,
    selectCurrentProduct,
    selectFilteredProducts,
    selectHaveProduct,
    selectProducts,
} from '../products.selectors';
import { IProductsState } from '../products.state';

describe('products selectors', () => {
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
            price: 2,
            rating: 3,
            description: 'testDescription3',
            characteristics: [
                { value: 'testValue3', description: 'testDescription3' },
            ],
            photos: ['tesPhoto7', 'testPhoto8', 'testPhoto9'],
            category: 'testCategory3',
        },
    ];
    const productsInitialState: IProductsState = {
        products,
        categories: ['testCategory1', 'testCategory2'],
        filteredProducts: [products[0]],
        currentChunk: [products[1], products[2]],
        currentProduct: products[2],
        productsNames: [products[1].name, products[2].name],
    };

    it('should select products state', () => {
        const productsState = selectProducts.projector(productsInitialState);

        expect(productsState).toEqual(productsInitialState);
    });
    it('should select all products', () => {
        const allProducts = selectAllProducts.projector(productsInitialState);

        expect(allProducts).toHaveLength(3);
        expect(allProducts[1]).toEqual(products[1]);
    });

    it('should select products categories', () => {
        const categories = selectCategories.projector(productsInitialState);

        expect(categories).toHaveLength(2);
        expect(categories[1]).toBe('testCategory2');
    });

    it('should select filtered products', () => {
        const filteredProducts =
            selectFilteredProducts.projector(productsInitialState);

        expect(filteredProducts).toHaveLength(1);
    });

    it('should select current chunk products', () => {
        const currentProduct =
            selectCurrentChunkProducts.projector(productsInitialState);

        expect(currentProduct).toHaveLength(2);
    });

    it('should select current product', () => {
        const currentProduct =
            selectCurrentProduct.projector(productsInitialState);

        expect(currentProduct?.url).toBe('testUrl3');
    });

    it('should select have product', () => {
        let haveProduct = selectHaveProduct.projector(productsInitialState);

        expect(haveProduct).toBeTruthy();

        haveProduct = selectHaveProduct.projector({
            ...productsInitialState,
            productsNames: [products[0].name],
        });

        expect(haveProduct).toBeFalsy();
    });
});
