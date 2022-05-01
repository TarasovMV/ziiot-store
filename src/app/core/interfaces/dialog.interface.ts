export interface Dialog<T, K> {
    data: T;
    close: (res?: K | undefined) => void;
}
