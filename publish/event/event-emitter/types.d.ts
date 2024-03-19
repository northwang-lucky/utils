export type CallbackFn = (...args: any[]) => void;
export type EventCallback = {
    id: string;
    removed: boolean;
    callback: CallbackFn;
};
