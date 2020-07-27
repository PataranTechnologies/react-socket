import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Join from './component/Join/Join'
import Chat from './component/Chat/Chat'
import './App.css';

const App=()=>
{
  return (

  <Router>
   
      <Route path="/" component={Join} exact />
      
      <Route path="/chat" component={Chat} exact />
    
     

    </Router>
  );
}

export default App;
