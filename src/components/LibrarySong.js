import React from 'react';
import data from '../data';

import { playAudio } from '../util';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, playing, setSongs}) => {

    // let prevSong = {...song};
    const handleSong = () => {
      const selectedSong = songs.filter((state) => state.id === id);
      setCurrentSong({ ...selectedSong[0] });
      //Set Active in library
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
  
      //Play audio
      playAudio(playing, audioRef);
    };

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
