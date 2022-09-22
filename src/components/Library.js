import React from 'react';
import LibrarySong from './LibrarySong';


const Library = ({songs, setCurrentSong, key, audioRef, playing, setSongs, toggleState}) => {
    return (
        <div className={`library ${toggleState ? '' : 'collapse'}`}>
            <h2>
                Library
            </h2>
            <div className="library-songs">
            {songs.map((song) => (
            <LibrarySong
                song={song}
                songs={songs}
                setCurrentSong={setCurrentSong}
                key={song.id}
                id={song.id}
                audioRef
                playing={playing}
                setSongs={setSongs}
            />
            ))}
      </div>
        </div>
    )
}

export default Library;