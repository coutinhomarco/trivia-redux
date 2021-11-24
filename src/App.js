import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/configuracoes" component={ Configuracoes } />
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
