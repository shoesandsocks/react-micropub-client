import React, { Suspense, useState, useEffect } from 'react';

import Pineandvine from './components/Pineandvine';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

import { checkForCode } from './funcs';
const MicropubComposer = React.lazy(() =>
  import('./components/MicropubComposer'),
);
const Login = React.lazy(() => import('./components/Login'));

function App() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [me, setMe] = useState('');

  useEffect(() => {
    checkForCode(window.location.search, setIsAuthed, setCheckingAuth, setMe);
  }, [isAuthed]);

  return checkingAuth ? (
    <Loading text="authorizing..." />
  ) : (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Loading text="loading..." />}>
          {isAuthed ? (
            <MicropubComposer me={me} />
          ) : (
            <Login setIsAuthed={setIsAuthed} />
          )}
          <Pineandvine padString="0 12px 6px 0" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
