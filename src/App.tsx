import { useState } from 'react'
import GraficoIngresosGastos from './assets/components/ui/graphics'
import GraficoGastosPorCategoria from './assets/components/ui/GraficoGastosPorCategoria'
import GraficoTendenciasMensuales from './assets/components/ui/GraficoTendenciasMensuales'
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
