import React, {useState, useRef} from 'react';

import './styles/app.scss'

import Player from './components/Player'
import Song from './components/Song';
import data from './data';
import Library from './components/Library';

function App() {

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [playing, setPlaying] = useState(currentSong.active);
  const [songInfo, setSongInfo] = useState([{
    currentTime: 0,
    duration: 0,
}]);

const [navState, setNavState] = useState(true);

  const audioRef = useRef(null);

  // handlers
  const playSongHandler = () => {
    setPlaying(!playing)
    playing ? audioRef.current.pause() : audioRef.current.play();
    // time controls
    setSongInfo({
        currentTime: audioRef.current.currentTime,
        duration: audioRef.current.duration,
    })
}

  const timeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
        ...songInfo,
        currentTime,
        duration,
    })
}


const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({ ...songInfo, currentTime: current, duration: duration });
};

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs}
      audioRef={audioRef}
      setSongs={setSongs}
      playing={playing} 
      setPlaying={setPlaying}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      playSongHandler={playSongHandler}
      timeHandler={timeHandler}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} setSongs={setSongs} toggleState={navState}/>
      <audio src={currentSong.audio} ref={audioRef} onTimeUpdate={timeHandler} onLoadedMetadata={timeUpdateHandler}></audio>
      <button className='nav-control' onClick={() => setNavState(!navState)}>Library</button>
    </div>
  );
}

export default App;
