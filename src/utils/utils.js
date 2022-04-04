

export const coalesce = (...args) => args.find((_) => ![null, undefined, ""].includes(_));