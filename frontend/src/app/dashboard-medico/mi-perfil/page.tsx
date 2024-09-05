'use client'
import SimpleDisplayData from '@/components/SimpleDisplayData.tsx/SimpleDisplayData'
import { Separator } from '@/components/ui/separator'
import { useStaffContext } from '@/context/medicoProvider'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

const MiPerfilMedico = () => {
  const [state,setPerfil] = useState([])
  const token = localStorage.getItem('token') || ''
  const idperfil = jwtDecode(token)
 useEffect(()=>{
   try{
     fetch(`https://backend-justina-deploy.onrender.com/v1/api/medical-staff/${idperfil.id}`,{
       method: "GET",
       headers:{
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token
       }
     })
     .then( res => res.json())
     .then( datos => { 
       console.log(datos)
       setPerfil(datos)})
   }catch(e){
     console.error(e, 'Hubo un error')
   }
 },[])
console.log(state)
  return (
    <div>
      <h3 className='mb-2 text-3xl font-bold'>Mi Perfil</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-y-8'>
          <SimpleDisplayData data={state.firstName} titulo='Nombre/s' />
          <SimpleDisplayData data={state.lastName} titulo='Apellido/s' />
        </div>

        <div className='flex gap-y-8'>
          <SimpleDisplayData data={state.phone || '--'} titulo='Teléfono' />
          <SimpleDisplayData data={state.email} titulo='Email' />
        </div>

        <div className='flex gap-y-8'>
          <SimpleDisplayData data='10/07/2024' titulo='Fecha de registro' />
        </div>

        <Separator />
        <div className='flex gap-y-8'>
          <SimpleDisplayData data={state?.medicalRegistrationNumber?.toString() || "--"} titulo='N° de Matricula' />

          <div className='flex-1'>
            <h3 className='text-lg font-semibold'>Especialidades</h3>
            <p className='text-lg capitalize'>{state.specialities}</p>
          </div>
        </div>

        <Separator />
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>Obras sociales/prepagas que recibe</h3>
          <ul>
            <li className='list-inside list-disc'>Prensa</li>
            <li className='list-inside list-disc'>OSDE</li>
            <li className='list-inside list-disc'>OSPE</li>
            <li className='list-inside list-disc'>Swiss Medical</li>
            <li className='list-inside list-disc'>OTRa</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MiPerfilMedico
