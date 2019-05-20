import React, { useState, useEffect } from 'react';

import { checkForCode } from './funcs';

import MicropubComposer from './components/MicropubComposer';
import Login from './components/Login';

function App() {
  const [isAuthed, setIsAuthed] = useState(true);

  useEffect(() => {
    checkForCode(window.location.search, setIsAuthed);
  }, []);

  return (
    <div className="App">
      {isAuthed ? <MicropubComposer /> : <Login setIsAuthed={setIsAuthed} />}
    </div>
  );
}

export default App;
