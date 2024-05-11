import { type HanziWriterOptions, default as HW } from 'hanzi-writer';

import CodeBlock from './code-block-processor/code-block.svelte';

const hwOptions: Partial<HanziWriterOptions> = {
    width: 100,
    height: 100,
    padding: 5,
    strokeColor: '#000000',
    radicalColor: '#EE00FF',
    showOutline: true,
    strokeAnimationSpeed: 2,
    delayBetweenStrokes: 10,
    showCharacter: false,
};

const c1Writer = HW.create(document.body, '讨', hwOptions);

const c2Writer = HW.create(document.body, '论', hwOptions);

const btn = document.createElement('button');
btn.textContent = 'Animate';
document.body.appendChild(btn);

btn.addEventListener('click', async () => {
    await Promise.all([c1Writer.hideCharacter(), c2Writer.hideCharacter()]);

    const delayBetweenAnimations = 500;

    await c1Writer.animateCharacter();

    await new Promise((resolve) => setTimeout(resolve, delayBetweenAnimations));

    await c2Writer.animateCharacter();
});

const app = document.createElement('div');
document.body.appendChild(app);

new CodeBlock({
    target: app,
    props: {
        source: '你好！初次见面',
    },
});
