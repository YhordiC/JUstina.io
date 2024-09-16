import React from 'react'

export default function PerfildevDato({titulo, parafo, className}) {
  return (
    <div className={className + ''}>
      <p className='text-xl font-medium'>{titulo}</p>
      <p>{parafo}</p>
    </div>
  )
}
