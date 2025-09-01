
import './App.css'
import Hero from './Hero'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import MathGame from './MathGame'
import ScienceQuiz from './ScienceQuiz'
import GeographyGame from './GeographyGame'
import MemoryGame from './MemoryGame'
import VocabGame from './VocabGame'
import CodingGame from './CodingGame'
import {BrowserRouter,Routes ,Route} from 'react-router-dom'

function App() {


  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Hero />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
       <Route path="/login/home" element={<Home />} />
       <Route path="/login/home/MathGame" element={<MathGame />} />
       <Route path="/login/home/ScienceQuiz" element={<ScienceQuiz />} />
       <Route path="/login/home/GeographyGame" element={<GeographyGame />} />
       <Route path="/login/home/MemoryGame" element={<MemoryGame />} />
       <Route path="/login/home/VocabGame" element={<VocabGame />} />
       <Route path="/login/home/CodingGame" element={<CodingGame />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
