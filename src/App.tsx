import { Provider } from 'react-redux';
import './assets/css/app.css';
import HomePage from './pages/home';
import {rootStore as store} from './store/root';

function App() {
  
  return (
    <Provider store={store}>
    <div className="adcreative-app">
      <HomePage/>
    </div>
    </Provider>
  );
}

export default App;
