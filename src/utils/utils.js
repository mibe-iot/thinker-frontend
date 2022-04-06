

export const coalesce = (...args) => args.find((_) => ![null, undefined, ""].includes(_));

export const delay = (seconds, callback) => setTimeout(callback, seconds * 1000)