export const playAudio  = (playing, audioRef) => {
    if(playing) {
        const playPromise = audioRef.current.play();
        if(playPromise !== undefined) {
            playPromise.then(async (audio) => {
                await audioRef.current.play();
            });
        }
    }
}