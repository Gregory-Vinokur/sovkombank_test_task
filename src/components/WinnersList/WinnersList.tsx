import { WinnerItem } from '../WinnerItem';
import './WinnersList.styles.css';

const WinnersList = () => {
  return (
    <div className="winners_list">
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
      <WinnerItem />
    </div>
  );
};

export { WinnersList };
