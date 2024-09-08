"use client";
import { User2Icon } from 'lucide-react'
import Image from 'next/image'
import TarjetaTurno from '@/components/ui/Perfil/TarjetaTurno'
import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {TokenContext} from '@/context/TokenProvider'
export default function PerfilPage() {

  const [perfil, setPerfil] = useState([])
  const token = useContext(TokenContext) // contexto de token
  
  useEffect(() => {
    console.log(token)
    const idperfil = jwtDecode(token)
    fetch(`https://backend-justina-deploy.onrender.com/v1/api/patient/${idperfil.id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(response => response.json())
    .then(dato => setPerfil(dato) )
  }, [])
  return (
    <div>
      <TarjetaTurno />

      <h3 className='text-end text-4xl font-bold mb-2'>Mi perfil</h3>
      <hr  className='mb-6 border-2 ' style={{borderColor: 'black'}}/>
      {perfil && 
        <div className='flex flex-col gap-6  text-xl sm:flex-row'>
          <section>
            <section className='flex flex-col gap-1 mb-2'>
              <p className='font-bold bg-[#898585]'>Nombre:</p>
              <p style={{
                borderBottom: '1px solid #898585',
                borderRadius: '5px',
              }}>{perfil.firstName} {perfil.lastName}</p>
            </section>

            <section className='flex flex-col gap-2 '>
              <p className='font-bold'>Email:</p>
              <p  style={{
                borderBottom: '1px solid #898585',
                borderRadius: '5px',
              }}>{perfil.email}</p>
            </section>

          </section>

          <section>
            <section className='flex flex-col gap-2'>
              <p className='font-bold'>Fechas de nacimiento:</p>
              <p style={{
                borderBottom: '1px solid #898585',
                borderRadius: '5px'
              }}
              >{perfil.birthDate}
              </p>
            </section>
            <section className='flex flex-col gap-2'>
              <p className='font-bold'>Sexo:</p>
              <p style={{
                borderBottom: '1px solid #898585',
                borderRadius: '5px'
              }}
              >{perfil.sex === 'M' ? 'Hombre' : 'Mujer'}
              </p>
            </section>
            <section className='flex flex-col gap-2'>
              <p className='font-bold'>Tipo de sangre:</p>
              <div
                className='flex gap-1' style={{
                  borderBottom: '1px solid #898585',
                  borderRadius: '5px'
                }}
              >
                <p>{perfil.bloodType}</p>
                <p>{perfil.bloodFactor === '-' ? 'Negativo' : 'Positivo'}</p>
              </div>
            </section>

            <section className='flex flex-col gap-2'>
              <p className='font-bold'>Número de documento:</p>
              <p style={{
                borderBottom: '1px solid #898585',
                borderRadius: '5px',
              }}
              >{perfil.identificationNumber}
              </p>
            </section>

           
          </section>
        </div>}

    </div>
  )
}
