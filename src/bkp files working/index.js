import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Menu from './Menu';
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import myApp from './reducers';

let store = createStore(myApp);

//console.log(store.getState())
//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Menu />, document.getElementById('root'));

/*render(
    <Provider store={store}>
      <Menu />
    </Provider>,
    document.getElementById('root')
  )
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();