import { Switch, Route } from 'react-router-dom'
import './styles/App.css'
import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/calendar" component={Calendar}></Route>
      </Switch>
    </div>
  )
}

export default App
