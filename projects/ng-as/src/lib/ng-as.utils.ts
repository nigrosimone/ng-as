// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ngAs = <T>(input: unknown, _baseItem: T | undefined): T => {
    return input as unknown as T;
}