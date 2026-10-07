import "./styles/App.css"
import AuthForm from './components/auth/AuthForm'

function App() {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center px-8">
      <AuthForm mode="login"/>
    </div>
  )
}

export default App