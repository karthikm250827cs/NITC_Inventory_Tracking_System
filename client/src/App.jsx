import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
export default function App(){
  return (
    <div>
      <main className="mx-auto">
        <Outlet/>
      </main>
    </div>
  )
}
