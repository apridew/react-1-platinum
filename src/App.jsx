import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';
import './App.css';

function App() {
  let element = useRoutes(routes);

  return element;
}

export default App;
