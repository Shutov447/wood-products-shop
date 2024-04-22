export interface IInputRangeData {
    min: number;
    max: number;
    initCurrentFrom?: number;
    initCurrentTo?: number;
    title?: string;
    showNumberInput?: boolean;
}

export interface IOutputRangeData {
    title?: string;
    from: number;
    to: number;
}
