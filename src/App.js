import './App.css';
import "./App.css"
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './components/screens/Home'
import Signin from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'

function App() {
  return (
    <>
     <BrowserRouter>
     <NavBar/>
     <Routes>
     <Route path="/" element={ <Home/>}>
     </Route>
     <Route path="/signin" element={  <Signin/>}>
     </Route>
     <Route path="/signup" element={ <Signup/>}>
     </Route>
     <Route path="/profile" element={ <Profile/>}>
     </Route>
     </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;
