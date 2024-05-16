export interface IInputRangeData {
    min: number;
    max: number;
    initCurrentFrom?: number;
    initCurrentTo?: number;
    title?: string;
    showNumberInput?: boolean;
}

export interface IOutputRangeData {
    title?: string | null;
    from: number;
    to: number;
}
