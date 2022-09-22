import React from 'react';
import data from '../data';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, playing, setSongs}) => {

    // let prevSong = {...song};
    const handleSong = () => {
        const selectedSong = song;
        setCurrentSong(selectedSong);

        if(playing) {
            const playPromise = audioRef.current.play();
            
            if(playPromise !== undefined) {
                playPromise.then(async (audio) => {
                    await audioRef.current.play();
                });
            }
        }
        const newSongs = songs.map((song) => {
            if (song.id === id) {
              return {
                ...song,
                active: true,
              };
            } else {
              return {
                ...song,
                active: false,
              };
            }
          });
          setSongs(newSongs);
}


    return (
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={() => handleSong()}>
            <img src={song.cover} alt={song.name}/>
            <div className='song-desc'>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;
