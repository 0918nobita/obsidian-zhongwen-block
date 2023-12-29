import { BehaviorSubject, map } from 'rxjs';

const synth = window.speechSynthesis;

const voiceList$ = new BehaviorSubject(synth.getVoices());

synth.addEventListener('voiceschanged', () => {
    voiceList$.next(synth.getVoices());
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const voiceSelector = document.getElementById('voiceList')!;

voiceList$
    .pipe(map((voices) => voices.filter((voice) => voice.lang === 'zh-CN')))
    .subscribe((voices) => {
        for (const voiceOption of voiceSelector.childNodes) {
            voiceSelector.removeChild(voiceOption);
        }

        for (const voice of voices) {
            const voiceOption = document.createElement('option');
            voiceOption.value = voice.voiceURI;
            voiceOption.textContent = voice.name;
            voiceSelector.appendChild(voiceOption);
        }
    });

voiceSelector.addEventListener('change', (event) => {
    const selectedVoiceURI = (event.currentTarget as HTMLSelectElement).value;

    const utterance = new SpeechSynthesisUtterance();

    utterance.text = '你好。我叫小明。你叫什么名字？';

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    utterance.voice = voiceList$.value.find(
        (voice) => voice.voiceURI === selectedVoiceURI,
    )!;

    synth.speak(utterance);
});
