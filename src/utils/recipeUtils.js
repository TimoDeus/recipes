export const normalizeTitle = title => title ? title.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, '-').toLowerCase() : title
