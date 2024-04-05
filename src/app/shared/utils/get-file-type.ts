export function getFileType(fileSrc: string) {
    return String(fileSrc.split('.').at(-1)).toUpperCase();
}
