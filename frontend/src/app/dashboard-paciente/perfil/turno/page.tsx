'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import {ObtenerHora} from '@/app/lib/Date'
import { jwtDecode } from 'jwt-decode'
import { TokenContext } from '@/context/TokenProvider'

const Formshema = z.object({
  descripcion: z.string().min(15, {
    message: 'Por favor la descripción tiene que ser mayor 15 caracteres'
  }).max(250, {
    message: 'Por favor la descripción tiene que ser menor a 250 caracteres'
  }),
  idMedicalStaff: z.string()
})

export default function Turno() {

  const token = useContext(TokenContext) // contexto de token
  const [datosMedicos, setDatosMedicos] = useState([])
   const form = useForm<z.infer<typeof Formshema>>({
    resolver: zodResolver(Formshema),
    defaultValues: {
      descripcion: '',
      idMedicalStaff: ''
    }
  })
  function onSubmit( value:z.infer<typeof Formshema>) {
    let datosperfil:{id:string} = jwtDecode(token) // si typeScript te molesta con que tu propiedad no existe
    const [timeString] = ObtenerHora()
    console.log(timeString)
    const values = {
      idPatient: datosperfil.id,
      idMedicalStaff: value.idMedicalStaff,
      reason: 'SEGUIMIENTO',
      description: value.descripcion,
      healthCenter: 'Buenos Aires Medical Center',
      date: `2024-12-28${timeString}`
    }
    console.log(value.idMedicalStaff)
    try {
       fetch('https://backend-justina-deploy.onrender.com/v1/api/appointment/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)

      }).then(async respuesta => await respuesta.json())
      .then( dato => console.log(dato))
    } catch (error) {
      console.log(error)
    }
    toast({
      title: 'Excelente, registraste tu consulta con éxito.',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <p className='text-white text-center'>Puedes ver todos tus citas en sección de Home</p>
        </pre>
      )
    })
  }

  useEffect(()=>{
    const localToken = localStorage.getItem('token' ?? '')

    try {
      void fetch('https://backend-justina-deploy.onrender.com/v1/api/medical-staff/getAll',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
        .then( respuesta =>  respuesta.json())
        .then( datoMedicos => setDatosMedicos(datoMedicos))
    } 
    catch (eror){
      console.error(eror)
    }

  },[])
  return (
    <div className='py-7  max-w-[500px] flex flex-col justify-center items-center bg-black rounded-xl text-white'>
      <h6 className='font-bold text-xl'>Saca tu turno</h6>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
          
          <FormField
            control={form.control}
            name={'idMedicalStaff'}
            render={({ field }) => (
              <FormItem className='sm:col-span-2'>
                <FormLabel>Medicos de turno</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger >
                      <SelectValue placeholder='Elija a un medico' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {datosMedicos.map((item:{id:string, firstName:string, lastName:string, specialities:string}) => (
                      <SelectItem className='' key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                        <span>{item.specialities}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
      )}
    />

          <FormField
            control={form.control}
            name='descripcion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por favor describa su dolecia o el motivo de su consulta.</FormLabel>
                <FormControl className='text-white h-64'>
                  <Textarea placeholder='Se claro y especifico por favor.' {...field} />
                </FormControl>
                <FormDescription>
                  Puedes pedir a una persona de confianza que te ayude a poner las descripción.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='bg-orange-600 px-6 py-3 hover:bg-orange-800'>Enviar</Button>
        </form>
      </Form>
      <Toaster />
    </div>
  )
}