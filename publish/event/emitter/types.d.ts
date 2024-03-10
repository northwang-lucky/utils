export type EventCallback = {
    id: string;
    removed: boolean;
    callback: (...args: any[]) => void;
};
