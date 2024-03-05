import { z } from 'zod';

export const settings = z
    .object({
        alwaysDisplayPinyin: z.boolean().optional().default(false).catch(false),
        lang: z
            .union([z.literal('en-US'), z.literal('ja-JP')])
            .optional()
            .default('en-US')
            .catch('en-US'),
    })
    .catch({ alwaysDisplayPinyin: false, lang: 'en-US' });

export type Settings = z.infer<typeof settings>;
