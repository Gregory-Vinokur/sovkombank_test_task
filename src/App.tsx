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

function App() {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [currentWinners, setCurrentWinners] = useState<ICandidate[]>([]);
  const [allWinners, setAllWinners] = useState<ICandidate[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);

  useEffect(() => {
    setCandidates(generateCandidates());
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
    setCount(1);
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

      // Устанавливаем интервал для добавления победителей каждую секунду
      const intervalId = setInterval(() => {
        setIsVideoPlay(true);
        setCurrentWinners((prevWinners) => [
          ...prevWinners,
          winners[currentIndex],
        ]);
        currentIndex++;

        // Проверяем, завершилось ли добавление всех победителей
        if (currentIndex === winners.length - 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            setAllWinners((prevWinners) => [...prevWinners, ...winners]);
            setCurrentWinners([]);
            setIsVideoPlay(false);
          }, 1000); //5000 ms
          // Останавливаем интервал
        }
      }, 1000);
    }, 1000); //15000 ms
  }, [candidates, isGameOn]);

  const startGame = () => {
    setIsGameOn(true);
  };

  return (
    <main className="main_content">
      <section className="current_winners_section">
        <VideoPlayer isPlay={isVideoPlay} />
        {!isGameOn && !isGameOver && (
          <button onClick={startGame}>Начать розыгрыш</button>
        )}
        {isGameOver && <span>Игра окончена</span>}
        <CurrentWinnersList currentWinners={currentWinners} />
      </section>
      <section className="winners_section">
        <WinnersList winners={allWinners} />
      </section>
      <Spinner count={count} setCount={setCount} />
    </main>
  );
}

export default App;
