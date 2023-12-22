import {WinnerItem} from '../WinnerItem';
import './WinnersList.styles.css';
import {WinnersListProps} from './WinnersList.types';

const WinnersList = ({winners}: WinnersListProps) => {
  return (
    <div className="winners_list">
      {winners.map((winner) => (
        <WinnerItem text={winner.name} key={winner.name} />
      ))}
    </div>
  );
};

export {WinnersList};
