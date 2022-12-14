import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../util';

const Player = ({currentSong, setSongs,playing, setPlaying,audioRef, nextHandler, songInfo, setSongInfo, playSongHandler, timeHandler, setCurrentSong, songs}) => {
        

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime: e.target.value});
    }

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
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
    },[currentSong])

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    
        //Forward BAck
        if (direction === "skip-forward") {
          setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-backwards") {
          if ((currentIndex - 1) % songs.length === -1) {
            setCurrentSong(songs[songs.length - 1]);
            return;
          }
          setCurrentSong(songs[(currentIndex - 1)]);
        }
        playAudio(playing, audioRef)
      };
    

    return (
        <div className='player'>
            <div className="time-control">
            <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
                <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}/>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' icon={faAngleLeft} size='2x' onClick={() => skipTrackHandler('skip-backwards')}/>
                <FontAwesomeIcon className='play' icon={playing ? faPause : faPlay} size='2x' onClick={playSongHandler} onLoadedMetadata={timeHandler}/>
                <FontAwesomeIcon className='skip-forward' icon={faAngleRight} size='2x' onClick={() => skipTrackHandler('skip-forward')}/>
            </div>
        </div>
    );
}

export default Player;