import './App.css';
import { TimersList } from './components/TimersList';
import { TimersProvider } from './contexts/timers';

function App() {
  return (
    <TimersProvider>
      <h1>Timers Manager</h1>

      <TimersList />
    </TimersProvider>
  );
}

export default App
