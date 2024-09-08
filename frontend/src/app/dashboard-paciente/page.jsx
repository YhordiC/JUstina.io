"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TarjetaTurno from '@/components/ui/Perfil/TarjetaTurno'
import { cn } from '@/lib/utils'
import { CheckIcon, DeleteIcon } from 'lucide-react'
import React, { useState,useEffect, useContext } from 'react'
import Cancelarconsulta from '@/components/ui/Paciente/Cancelarconsulta'
import { jwtDecode } from 'jwt-decode'
import { TokenContext } from '@/context/TokenProvider'

const MainDashboard = () => {
  const [Turnos, setTurnos] = useState([])
  const [cancelarTurno, setCancelarTurno] = useState(false)
  const [idTurno, setidTurno]  = useState(0)
  const token = useContext(TokenContext) // contexto de token
// const [TratamientosRealizados,setTratamientosRealizados] = useState(0)
// const [TratamientosPendientes,setTratamientosPendientes] = useState(0)
  
  /* const listaTratamientos = [
    {
      tramaniento: 'Nueva toma de Ciclosporina 10 mg',
      estado: true,
      hora: '8:30',
      periodo: 'AM'
    },
    {
      tramaniento: 'Consulta Control',
      estado: true,
      hora: '2:00',
      periodo: 'PM',
      hospital: 'Consultorio Hospital Australia'
    },
    {
      tramaniento: 'Seguimiento de Plan Nutricional',
      estado: false,
      tarea: 'Chequear estado de plan'
    },
    {
      tramaniento: 'Seguimiento Actividad Física',
      estado: false
    },
    {
      tramaniento: 'Nueva toma de Ciclosporina 10 mg',
      estado: true,
      hora: '8:30',
      periodo: 'AM'
    },
    {
      tramaniento: 'Consulta Control',
      estado: true,
      hora: '2:00',
      periodo: 'PM',
      hospital: 'Consultorio Hospital Australia'
    },
    {
      tramaniento: 'Seguimiento de Plan Nutricional',
      estado: true,
      tarea: 'Chequear estado de plan'
    },
    {
      tramaniento: 'Seguimiento Actividad Física',
      estado: true
    },
    {
      tramaniento: 'Nueva toma de Ciclosporina 10 mg',
      estado: true,
      hora: '8:30',
      periodo: 'AM'
    },
    {
      tramaniento: 'Consulta Control',
      estado: true,
      hora: '2:00',
      periodo: 'PM',
      hospital: 'Consultorio Hospital Australia'
    },
    {
      tramaniento: 'Seguimiento de Plan Nutricional',
      estado: false,
      tarea: 'Chequear estado de plan'
    },
    {
      tramaniento: 'Seguimiento Actividad Física',
      estado: false
    }
  ] */
  /* function calcularEstadoTratamiento() {
    let realizados = 0;
    let pendiente = 0;
    listaTratamientos.forEach(element => {
      if (element.estado) {
        realizados++;
        console.log('realizado')
      } else {
        pendiente++;
      }
    })
    setTratamientosPendientes(pendiente)
    setTratamientosRealizados(realizados)
  } */
  
  function Cancelar(id) {
    setidTurno(id)
    setCancelarTurno(!cancelarTurno)
  }

 
    useEffect(() => {
   
    console.log(token)
    const datosperfil  = jwtDecode(token)
    try {
      void fetch(`https://backend-justina-deploy.onrender.com/v1/api/appointment/getByPatient/2`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then( async response => await response.json())
        .then(turnos => setTurnos(turnos))
    }catch(error){
      console.log(error)
    }
  }, [])
  return (
    <div className='min-h-screen'>
      <h4 className='text-3xl font-bold mb-6 text-center'>Inicio</h4>
      <TarjetaTurno />
      {Turnos ? <h5 className='mb-4 font-bold'>Turnos Programados</h5> : <h5>No tienes turnos programados</h5>}
      <div className='grid gap-4 h-[500px] overflow-hidden overflow-y-auto' style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(305px, 1fr))'
      }}>{Turnos.map((turno) => (
        <Card className={cn('', 'className')} /*{...props}*/ key={turno.id}>
          <CardHeader className=' flex-row justify-between items-start'>
            <div>
              <CardTitle className='mb-4'>Consulta a </CardTitle>
              <CardDescription>{turno.description}</CardDescription>
            </div>
            <span className='text-white text-[10px] p-1 rounded-sm bg-blue-500 flex items-center'>{turno.active ? 'Vigente' : 'No vigente'}</span>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className=' flex flex-col  space-y-2 rounded-md border p-4' > 
              <section className='flex gap-2'>
                <p className='font-medium'>Profesional:</p>
                <p className=''>{turno.fullNameMedicalStaff}</p>
              </section>
              <section className='flex gap-2 '>
                <p className='font-medium'>Especialidad:</p>
                <p className=''>{turno.specialty }</p>
              </section>

              <section className='flex gap-2 '>
                <p className='font-medium'>Lugar:</p>
                <p className=' '>{turno.healthCenter}</p>
              </section>

              <section className='flex gap-2 items-end'>
                <p className='font-medium text-sm'>Fecha:</p>
                <p className='text-xs'>{turno.date}</p>
              </section>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='bg-red-600  mr-0 ml-auto' onClick={()=> { Cancelar(turno.id) } }>
              <DeleteIcon className='mr-2 h-4 w-4' /> Cancelar consulta
            </Button>
          </CardFooter>
        </Card>
      ))}
        {cancelarTurno &&
          <Cancelarconsulta id={idTurno} fn={()=> setCancelarTurno(!cancelarTurno)}/>}
      </div>
      
    </div>
  )
}

export default MainDashboard