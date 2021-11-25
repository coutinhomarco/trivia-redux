import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/Settings" component={ Settings } />
          <Route path="/game" component={ GamePage } />
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
