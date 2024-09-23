import React from 'react'

export default function PerfildevDato({ titulo, parafo, className }: { titulo: string, parafo: string, className?: string }) {
  const newClass = className || ''
  return (
    <div className={newClass}>
      <p className='text-xl font-medium'>{titulo}</p>
      <p>{parafo}</p>
    </div>
  )
}
