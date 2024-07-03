document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const speedInput = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');

    let speech = new SpeechSynthesisUtterance();
    let isPaused = false;

    speedInput.addEventListener('input', () => {
        speedValue.textContent = speedInput.value;
    });

    playButton.addEventListener('click', () => {
        if (speechSynthesis.speaking && isPaused) {
            speechSynthesis.resume();
        } else {
            speech.text = textInput.value;
            speech.rate = speedInput.value;
            speechSynthesis.speak(speech);
        }
        isPaused = false;
    });

    pauseButton.addEventListener('click', () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
            isPaused = true;
        }
    });

    stopButton.addEventListener('click', () => {
        speechSynthesis.cancel();
        isPaused = false;
    });

    speech.onend = () => {
        isPaused = false;
    };
});
