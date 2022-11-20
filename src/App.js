import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import React from 'react';
// import { MemoryRouter, Switch, Route } from 'react-router-dom';
import './App.css';


// const Home = () => <span>Home</span>;

// const About = () => <span>About</span>;

// const Users = () => <span>Users</span>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React hello world
        </a>
      </header>
    </div>
  );
}

// const App = () => (
//   <MemoryRouter>
//     <Container className="p-3">
//       <Jumbotron>
//         <h1 className="header">Welcome To React-Bootstrap</h1>
//         <h2>
//           Current Page is{' '}
//           <Switch>
//             <Route path="/about">
//               <About />
//             </Route>
//             <Route path="/users">
//               <Users />
//             </Route>
//             <Route path="/">
//               <Home />
//             </Route>
//           </Switch>
//         </h2>
//         <h2>
//           Navigate to{' '}
//           <ButtonToolbar className="custom-btn-toolbar">
//             <LinkContainer to="/">
//               <Button>Home</Button>
//             </LinkContainer>
//             <LinkContainer to="/about">
//               <Button>About</Button>
//             </LinkContainer>
//             <LinkContainer to="/users">
//               <Button>Users</Button>
//             </LinkContainer>
//           </ButtonToolbar>
//         </h2>
//       </Jumbotron>
//     </Container>
//   </MemoryRouter>
// );

export default App;
