import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import theme from '../../../common/theme';
import { persistor, store } from '../../../store';
import Root from '../Root';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router basename={process.env.PUBLIC_URL || '/'}>
            <CssBaseline />
            <Root />
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
