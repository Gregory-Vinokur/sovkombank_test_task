import {useEffect, useState} from 'react';
import './App.css';
import {
  CurrentWinnersList,
  Spinner,
  VideoPlayer,
  WinnersList,
} from './components';
import {generateCandidates} from './utils/generateCandidates';
import {ICandidate} from '@/interfaces/ICandidate';
import {getRandomWinners} from './utils/getRandomWinners';
import {ERROR_MESSAGE, FIFTEEN_SECONDS, FIVE_SECONDS} from './constants';

function App() {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [currentWinners, setCurrentWinners] = useState<ICandidate[]>([]);
  const [allWinners, setAllWinners] = useState<ICandidate[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const loadedCandidates = generateCandidates();
      setCandidates(loadedCandidates);
      setError(null);
    } catch (error) {
      setError(ERROR_MESSAGE);
    }
  }, []);

  useEffect(() => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter(
        (candidate) =>
          !allWinners.some((winner) => winner.name === candidate.name)
      )
    );

    if (allWinners.length >= 34) {
      setIsGameOn(false);
      setIsGameOver(true);
    }
  }, [allWinners]);

  useEffect(() => {
    if (!isGameOn) {
      return;
    }
    setCount(15);
    setTimeout(() => {
      let currentWinnerCount: number;

      if (candidates.length === 67) {
        currentWinnerCount = 1;
      } else {
        currentWinnerCount = 3;
      }

      const randomIndexes = getRandomWinners(
        candidates.length,
        currentWinnerCount
      );
      const winners = randomIndexes.map((index) => candidates[index]);

      let currentIndex = -1;

      const intervalId = setInterval(() => {
        setIsVideoPlay(true);
        setCurrentWinners((prevWinners) => [
          ...prevWinners,
          winners[currentIndex],
        ]);
        currentIndex++;

        if (currentIndex === winners.length - 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            setAllWinners((prevWinners) => [...prevWinners, ...winners]);
            setCurrentWinners([]);
            setIsVideoPlay(false);
          }, FIVE_SECONDS);
        }
      }, 1000);
    }, FIFTEEN_SECONDS);
  }, [candidates, isGameOn]);

  const startGame = () => {
    setIsGameOn(true);
    setError(null);
  };

  const resetGame = () => {
    setCandidates(generateCandidates());
    setCurrentWinners([]);
    setCount(null);
    setAllWinners([]);
    setIsGameOn(false);
    setIsGameOver(false);
    setIsVideoPlay(false);
  };

  return (
    <main className="main_content">
      <section className="current_winners_section">
        <VideoPlayer isPlay={isVideoPlay} />
        <div className="current_winners_list">
          {isGameOn && <CurrentWinnersList currentWinners={currentWinners} />}
          {!isGameOn && !isGameOver && !error && (
            <button
              className="current_winners_list__button"
              onClick={startGame}
            >
              Начать розыгрыш
            </button>
          )}
          {isGameOn && currentWinners.length === 0 && (
            <Spinner count={count} setCount={setCount} />
          )}
          {error && <span className="current_winners_list__text">{error}</span>}
          {isGameOver && (
            <>
              <span className="current_winners_list__text">
                Розыгрыш окончен.
              </span>
              <button
                className="current_winners_list__button"
                onClick={resetGame}
              >
                Обнулить результат
              </button>
            </>
          )}
        </div>
      </section>
      <section className="winners_section">
        <WinnersList winners={allWinners} />
      </section>
    </main>
  );
}

export default App;
