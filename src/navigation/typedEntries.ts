const typedEntries = <T extends Record<string, unknown>>(obj: T) => Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export default typedEntries;
