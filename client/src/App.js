import './App.css';
import { Chat } from './Components/Chat';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { SuccessfulRegisteration } from './Components/SuccessfulRegisteration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<SignUp />} />
        <Route exact path='/success' element={<SuccessfulRegisteration />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/chat' element={<Chat />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
