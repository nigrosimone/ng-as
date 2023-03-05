export const ngAs = <T>(input: unknown, baseItem: T | undefined): T => {
    return input as unknown as T;
}