export const getWordCount = (text: string) => text.trim().replace(/\s+/g, ' ').split(' ').length;
