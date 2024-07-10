export function normalizeDataSize(dataSize: number): string {
    const dataUnits = ['B', 'KB', 'MB'];
    let i = 0;

    for (; i < dataUnits.length - 1 && dataSize >= 1024; i++) {
        dataSize = Number((dataSize / 1024).toFixed(0));
    }

    return `${dataSize} ${dataUnits[i]}`;
}
