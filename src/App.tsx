import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@app/contexts/ThemeProvider';
import Router from '@app/Router';
import Header from '@views/components/Header';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
