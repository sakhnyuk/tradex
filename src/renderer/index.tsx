import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const App: React.FC = () => {
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    const timerInterval = setInterval(() => setTimer(timer - 1), 1000);

    return () => clearInterval(timerInterval);
  });

  const resetTimer = (): void => setTimer(100);

  return (
    <AppContainer>
      <div>
        <h1>Tradev App</h1>
        <div>{timer}</div>
        <button type="button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </AppContainer>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
