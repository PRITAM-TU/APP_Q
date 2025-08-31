
import './App.css'
import Hero from './Hero'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Quiz from './Quiz'
import {BrowserRouter,Routes ,Route} from 'react-router-dom'

function App() {


  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Hero />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
       <Route path="/login/home" element={<Home />} />
       <Route path="/login/home/quiz" element={<Quiz />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
