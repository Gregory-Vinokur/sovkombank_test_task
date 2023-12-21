import './App.css';
import { CurrentWinnersList, VideoPlayer, WinnersList } from './components';

function App() {
  return (
    <main className="main_content">
      <section className="current_winners_section">
        <VideoPlayer />
        <CurrentWinnersList />
      </section>
      <section className="winners_section">
        <WinnersList />
      </section>
    </main>
  );
}

export default App;
