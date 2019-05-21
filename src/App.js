import React, { useState, useEffect } from 'react';

import { checkForCode } from './funcs';

import MicropubComposer from './components/MicropubComposer';
import Login from './components/Login';
import Pineandvine from './components/Pineandvine';

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    checkForCode(window.location.search, setIsAuthed);
  }, []);

  return (
    <div className="App">
      {isAuthed ? <MicropubComposer /> : <Login setIsAuthed={setIsAuthed} />}
      <Pineandvine padString="0 12px 6px 0" />
    </div>
  );
}

export default App;
