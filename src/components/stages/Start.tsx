import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MainBtn from '../buttons/MainBtn';
import IconBtn from '../buttons/IconBtn';
import S from '../../media/s.png';
import './Start.scss';

type Props = {
  startHandler: () => void;
  changeModeHandler: (num: number) => void;
  changeSpeedHandler: (num: number) => void;
};

type SaveResults = {
  name: string;
  correct: number;
  wrong: number;
  missed: number;
}[];

const Start: FC<Props> = ({
  startHandler,
  changeModeHandler,
  changeSpeedHandler,
}) => {
  const [showRules, setShowRules] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [getResults, setGetResults] = useState<SaveResults>([]);
  const [mode, setMode] = useState(10);
  const [speed, setSpeed] = useState(2000);

  useEffect(() => {
    // @ts-ignore
    const local = JSON.parse(localStorage.getItem('results'));
    // @ts-ignore
    setGetResults(...getResults, local);
  }, []);


  const changeMode = (num: number) => changeModeHandler(num);
  const changeSpeed = (num: number) => changeSpeedHandler(num);
  const changeActive = (num: number) => setMode(num);
  const changeActive2 = (num: number) => setSpeed(num);

  return (
    <div className="start">
      <h2> Stroop Game</h2>
      <MainBtn
        text="Results"
        onClick={() => {
          setShowRules(false);
          setShowSettings(false);
          setShowResults(!showResults);
        }}
      />
      <MainBtn
        className="button--play"
        text="PLAY"
        onClick={startHandler}
      />
      <MainBtn
        text="Rules"
        onClick={() => {
          setShowResults(false);
          setShowSettings(false);
          setShowRules(!showRules);
        }}
      />
      <IconBtn
        src={S}
        className="button--setting"
        onClick={() => {
          setShowRules(false);
          setShowResults(false);
          setShowSettings(!showSettings);
        }}
      />

      {showRules && (
        <div className="rules">
          <h1 className="heading"> How To Play </h1>
          <p className="rules__text">
            <span className="color-r">GREEN</span> {'-> press'}
            <MainBtn className="button--key" text="R" />
            beacuse the ink is red
          </p>
          <p>
            <span className="color-g">BLUE</span> {'-> press'}
            <MainBtn className="button--key" text="G" />
            beacuse the ink is green
          </p>
          <p>
            <span className="color-b">YELLOW</span> {'-> press'}
            <MainBtn className="button--key" text="B" />
            beacuse the ink is blue
          </p>
          <p>
            <span className="color-y">RED</span> {'-> press'}
            <MainBtn className="button--key" text="Y" />
            beacuse the ink is yellow
          </p>
        </div>
      )}

      {showResults && (
        <div className="results">
          <h1 className="heading"> Latest results </h1>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Missed</th>
              </tr>
            </thead>
            <tbody>
              {getResults.map((i, index) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{index + 1}</td>
                    <td>{i.name}</td>
                    <td>{i.correct}</td>
                    <td>{i.wrong}</td>
                    <td>{i.missed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showSettings && (
        <div className="setup">
          <div className="setup--wrapper">
            <h3>Game mode</h3>
            <div className="setup--buttons">
              <MainBtn
                text="Short"
                className={`button button--set ${mode === 10 && 'active'}`}
                onClick={() => {
                  changeMode(10);
                  changeActive(10);
                }}
              />
              <MainBtn
                text="Medium"
                className={`button button--set ${mode === 20 && 'active'}`}
                onClick={() => {
                  changeMode(20);
                  changeActive(20);
                }}
              />
              <MainBtn
                text="Long"
                className={`button button--set ${mode === 30 && 'active'}`}
                onClick={() => {
                  changeMode(30);
                  changeActive(30);
                }}
              />
            </div>
            <h3>Speed</h3>
            <div className="setup--buttons">
              <MainBtn
                text="Slow"
                className={`button button--set ${speed === 3000 && 'active'}`}
                onClick={() => {
                  changeSpeed(3000);
                  changeActive2(3000);
                }}
              />
              <MainBtn
                text="Medium"
                className={`button button--set ${speed === 2000 && 'active'}`}
                onClick={() => {
                  changeSpeed(2000);
                  changeActive2(2000);
                }}
              />
              <MainBtn
                text="Fast"
                className={`button button--set ${speed === 1000 && 'active'}`}
                onClick={() => {
                  changeSpeed(1000);
                  changeActive2(1000);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
