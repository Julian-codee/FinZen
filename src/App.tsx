

import Dashboard from './Components/Features/Reporting/Components/Dashboard'
import Accounts from './Components/Features/Accounts/Accounts'
import './App.css'
import {AuthPage} from './Components/Auth/AuthPage'
import {Hero} from './Components/Auth/Hero'





function App() {


  return (
    <>

      <div className="relative w-full h-screen overflow-hidden">
      
        <AuthPage />
      </div>  
  
     <Accounts />
   <Dashboard />
   <Hero />
     </>

  )
}

export default App

