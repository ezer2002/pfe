import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; // Importez createStore
import { persistStore, persistReducer } from 'redux-persist'; // Importez persistStore et persistReducer
import storage from 'redux-persist/lib/storage'; // Utilisez le stockage localStorage par défaut
import { PersistGate } from 'redux-persist/integration/react'; // Importez PersistGate
import reducer from './reducers/reducer';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer); // Utilisez createStore avec le reducer persisté
const persistor = persistStore(store); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> {/* Utilisez PersistGate */}

    <App /> 
        </PersistGate>
      </Provider>
      </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
