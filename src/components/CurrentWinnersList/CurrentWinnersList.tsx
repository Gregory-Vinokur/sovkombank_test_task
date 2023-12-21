import { WinnerItem } from '../WinnerItem';
import './CurrentWinnersList.styles.css';

const CurrentWinnersList = () => {
  return (
    <div className="current_winners_list">
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
    </div>
  );
};

export { CurrentWinnersList };
