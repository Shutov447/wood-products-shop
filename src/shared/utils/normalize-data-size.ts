export function normalizeDataSize(dataSize: number): string {
    const dataUnits = ['B', 'KB', 'MB'];
    let i = 0;

    for (; i < dataUnits.length - 1 && dataSize >= 1024; ) {
        dataSize = Number((dataSize / 1024).toFixed(0));
        i++;
    }

    return `${dataSize} ${dataUnits[i]}`;
}
