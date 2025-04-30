import './App.css'
import { AuthBackground } from './assets/Backgrounds/Auht-background'



function App() {

  return (
    <>

<div className="relative w-full h-screen overflow-hidden">
      <AuthBackground mode="login" theme="dark" />

      {/* Contenido principal encima del fondo animado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Bienvenido de nuevo</h1>
        <p className="text-lg mb-6">Por favor, inicia sesión para continuar</p>
        <form className="flex flex-col space-y-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-3 rounded bg-white/10 text-white placeholder-white/60 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 rounded bg-white/10 text-white placeholder-white/60 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-colors py-3 rounded font-semibold"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default App
