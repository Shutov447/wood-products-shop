import { normalizeDataSize } from './normalize-data-size';

describe('normalizeDataSize', () => {
    it('возвращает количество байт', () => {
        expect(normalizeDataSize(498)).toEqual('498 B');
        expect(normalizeDataSize(756)).toEqual('756 B');
    });

    it('возвращает количество кило-байт', () => {
        expect(normalizeDataSize(1477)).toEqual('1 KB');
        expect(normalizeDataSize(1934)).toEqual('2 KB');
    });

    it('возвращает количество мега-байт', () => {
        expect(normalizeDataSize(9_000_000)).toEqual('9 MB');
        expect(normalizeDataSize(5_453_845)).toEqual('5 MB');
    });
});
