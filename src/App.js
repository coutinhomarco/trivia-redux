import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/game" component={ GamePage } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
