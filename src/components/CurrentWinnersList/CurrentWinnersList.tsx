import {WinnerItem} from '../WinnerItem';
import {CurrentWinnersListProps} from './CurrentWinnersList.types';

const CurrentWinnersList = ({currentWinners}: CurrentWinnersListProps) => {
  return (
    <>
      {currentWinners.map((winner) => (
        <WinnerItem text={winner.name} key={winner.name} />
      ))}
    </>
  );
};

export {CurrentWinnersList};
