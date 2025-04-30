import { useState } from 'react'
import GraficoIngresosGastos from './assets/dd/ss/graphics'
import GraficoGastosPorCategoria from './assets/dd/ss/GraficoGastosPorCategoria'
import GraficoTendenciasMensuales from './assets/dd/ss/GraficoTendenciasMensuales'
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
