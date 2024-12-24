export const subdomainNameGenerator = (name: string) => {
    const cleanName = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .trim();
    const truncatedName = cleanName.slice(0, 10);
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    return `${truncatedName}${randomSuffix}`;
};