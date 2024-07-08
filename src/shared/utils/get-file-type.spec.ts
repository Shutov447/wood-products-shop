import { getFileType } from './get-file-type';

describe('getFileType', () => {
    it('должен вернуть тип файла в UpperCase', () => {
        expect(getFileType('some-data.type.json')).toEqual('JSON');
    });
});
