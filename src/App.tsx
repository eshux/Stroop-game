import React, { useEffect, useState } from 'react';
import './App.scss';
import 'flexboxgrid';
import Start from './components/stages/Start';
import IconBtn from './components/buttons/IconBtn';
import L from './media/ar.png';
import R from './media/ar2.png';

const soundC = new Audio('correct.mp3');
const soundW = new Audio('wrong.mp3');

const colors = ['red', 'green', 'blue', 'yellow'];
const words = ['RED', 'GREEN', 'BLUE', 'YELLOW'];

const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

type Results = {
  result: string;
  count: number;
}[];

const resultData = [
  {
    result: 'correct',
    count: 0,
  },
  {
    result: 'wrong',
    count: 0,
  },
  {
    result: 'missed',
    count: 0,
  },
];

type SaveResults = {
  name: string;
  correct: number;
  wrong: number;
  missed: number;
}[];

const App = () => {
  const [word, setWord] = useState(words[randomNumber(4)]); // konkrētais vārds
  const [color, setColor] = useState(colors[randomNumber(4)]); // konkrētā krāsa
  const [counter, setCounter] = useState(-2); // ik 2 sec mainās krāsa
  const [results, setResults] = useState<Results>(resultData);
  const [pressedKey, setPressedKey] = useState('');
  const [littleCounter, setLittleCounter] = useState(-1); // little timer, that sets the big timer
  const [inputValue, setInputValue] = useState('');
  const [saveResults, setSaveResults] = useState<SaveResults>([]);
  const [gameMode, setGameMode] = useState(10); // game mode - default 10x color change
  const [gameSpeed, setGameSpeed] = useState(2000); // game speed - default 2s

  // REGISTER PRESSED KEY
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      setPressedKey(e.key);
    });
  }, [counter]);

  // SETS OFF THE BIG TIMER
  useEffect(() => {
    if (littleCounter === 0) {
      setCounter(gameMode);
    }
  }, [littleCounter]);

  // LITTLE TIMER
  useEffect(() => {
    // @ts-ignore
    let timer;
    if (littleCounter > 0) {
      timer = setTimeout(() => {
        setLittleCounter(littleCounter - 1);
      }, 1000);
    }
    // @ts-ignore
    return () => clearTimeout(timer);
  }, [littleCounter]);

  // BIG TIMER
  useEffect(() => {
    // @ts-ignore
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => {
        setWord(words[randomNumber(4)]);
        setColor(colors[randomNumber(4)]);
        setCounter(counter - 1);
        setPressedKey('');
      }, gameSpeed);
    }
    // @ts-ignore
    return () => clearTimeout(timer);
  }, [counter]);

  // COMPARE DATA AND SETS RESULTS
  useEffect(() => {
    if (counter > 0) {
      const newArr = [...results];
      if (pressedKey === color.charAt(0)) {
        newArr[0].count += 1;
        soundC.play();
      } else if (pressedKey !== '') {
        newArr[1].count += 1;
        soundW.play();
      }
      newArr[2].count = gameMode-(newArr[1].count + newArr[0].count);
      newArr[2].count < 0 && (newArr[2].count = 0);
      setResults(newArr);
    }
  }, [pressedKey]);

  // SAVES RESULTS
  const saveResultsHandler = () => {
    setSaveResults([
      ...saveResults,
      {
        name: inputValue,
        correct: results[0].count,
        wrong: results[1].count,
        missed: results[2].count,
      },
    ]);
    setInputValue('');
  };

  // SAVES RESULTS IN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(saveResults));
  }, [saveResults]);

  // SETS GAME MODE  10 / 25 /40
  const changeModeHandler = (num: number) => {
    setGameMode(num);
  };

  // SETS GAME SPEED  1s / 2s / 3s
  const changeSpeedHandler = (num: number) => {
    setGameSpeed(num);
  };


  return (
    <div className="app">
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12">
            {littleCounter < 0 && counter < -1 && (
              <Start
                changeSpeedHandler={(num) => changeSpeedHandler(num)}
                changeModeHandler={(num) => changeModeHandler(num)}
                startHandler={() => {
                  setLittleCounter(3);
                }}
              />
            )}
          </div>
        </div>

        <div className="row center-xs">
          <div className="col-xs-12">
            {littleCounter >= 0 && counter !== 0 && (
              <>
                {littleCounter > 0 ? (
                  <h2>{littleCounter}</h2>
                ) : (
                  <>
                    <h3 className="counter">{counter}</h3>
                    <h1 style={{ color: `${color}`, fontSize: '70px' }}>
                      {word}
                    </h1>
                    <IconBtn
                      className='button--icon button--icon-return'
                      src={L}
                      onClick={() => {
                        setCounter(-2);
                        setLittleCounter(-1);
                      }}
                    />
                    <IconBtn
                      className='button--icon button--icon-skip'
                      src={R}
                      onClick={() => {
                        setCounter(0);
                        setLittleCounter(0);
                      }}
                    />
                  </>
                )}
              </>
            )}

            {counter === 0 && (
              <>
                <h3>Correct : {results[0].count}</h3>
                <h3>Wrong : {results[1].count}</h3>
                <h3>Missed : {results[2].count}</h3>
                <br />
                <h5>Save your results</h5>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className='input'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="button" className='button--save' onClick={saveResultsHandler}>
                  SAVE
                </button>
                <IconBtn
                  className='button--icon button--icon-return'
                  src={L}
                  onClick={() => {
                    setCounter(-2);
                    setLittleCounter(-1);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
