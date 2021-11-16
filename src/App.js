import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'

function App() {
  return (
    <div>
      <MyNavbar brand="Strivestaurant" />
      <Home />
    </div>
  )
}

export default App
