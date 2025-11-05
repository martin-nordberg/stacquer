

export const dropNullFields = (rec: any) =>
    Object.fromEntries(Object.entries(rec).filter(([_,v]) => (typeof v !== 'undefined') && (v !== null)))
