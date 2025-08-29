export const generateId = () => {
    try {
        return crypto.randomUUID();
    }
    catch {
        return new Date().toISOString();
    }
};
