import { useState } from 'react'
import GraficoGastosPorCategoria from './Components/Ui/Graphics/GraficoGastosPorCategoria'
import GraficoIngresosGastos from './Components/Ui/Graphics/graphics'
import GraficoTendenciasMensuales from './Components/Ui/Graphics/GraficoTendenciasMensuales'

import './App.css'

function App() {


  return (
    <>
     <GraficoIngresosGastos />
     <GraficoGastosPorCategoria />
     <GraficoTendenciasMensuales />
     </>
  )
}

export default App
