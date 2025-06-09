import { describe, it, expect } from 'bun:test';
import { getPinyin, getJyutping } from './get-romanization';

describe('getPinyin', () => {
    it('should convert Chinese characters to pinyin', async () => {
        const result = await getPinyin('你好');
        expect(result).toEqual([
            { romanization: 'nǐ', origin: '你' },
            { romanization: 'hǎo', origin: '好' },
        ]);
    });

    it('should handle non chinese characters', async () => {
        const result = await getPinyin('.');
        expect(result).toEqual([{ romanization: '', origin: '.' }]);
    });

    it('should handle empty string', async () => {
        const result = await getPinyin('');
        expect(result).toEqual([]);
    });

    it('should memoize results for the same input', async () => {
        const firstCall = await getPinyin('你好');
        const secondCall = await getPinyin('你好');
        expect(firstCall).toBe(secondCall); // Same reference due to memoization
    });
});

describe('getJyutping', () => {
    it('should convert Chinese characters to jyutping', async () => {
        const result = await getJyutping('你好');
        expect(result).toEqual([
            { romanization: 'nei5', origin: '你' },
            { romanization: 'hou2', origin: '好' },
        ]);
    });

    it('should handle non chinese characters', async () => {
        const result = await getJyutping('.');
        expect(result).toEqual([{ romanization: '', origin: '.' }]);
    });

    it('should handle empty string', async () => {
        const result = await getJyutping('');
        expect(result).toEqual([]);
    });

    it('should memoize results for the same input', async () => {
        const firstCall = await getJyutping('你好');
        const secondCall = await getJyutping('你好');
        expect(firstCall).toBe(secondCall); // Same reference due to memoization
    });
});
