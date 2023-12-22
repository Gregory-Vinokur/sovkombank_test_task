import {WinnerItem} from '../WinnerItem';
import './CurrentWinnersList.styles.css';
import {CurrentWinnersListProps} from './CurrentWinnersList.types';

const CurrentWinnersList = ({currentWinners}: CurrentWinnersListProps) => {
  return (
    <div className="current_winners_list">
      {currentWinners.map((winner) => (
        <WinnerItem text={winner.name} key={winner.name} />
      ))}
    </div>
  );
};

export {CurrentWinnersList};
