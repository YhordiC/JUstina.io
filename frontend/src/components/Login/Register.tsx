'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Image from 'next/image'
import InputText from '../ui/Perfil/InputText'
import SelectPerfil from '../ui/Perfil/SelectPerfil'

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters'
    })
    .max(15, {
      message: 'Name must be at least 10 characters'
    }),
  lastName: z
    .string()
    .min(3, {
      message: 'Last name must be at least 3 characters'
    })
    .max(15, {
      message: 'Last name must be at least 10 characters'
    }),
  identificationNumber: z.string().min(3, {
    message: 'Numero de identificación muy corto' }),
  email: z.string(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters'
  }),
  // perfil: z.string(),
  phone: z.string(),
  address: z.string(),
  birthDate: z.string(),
  bloodType: z.string(),
  bloodFactor: z.string(),
  sex: z.string()

})

export default function Register({ isRegister: register = true }) {
  const [desplegue, setDesplegue] = useState(false)
  const [Token, setToken] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // perfil: '',
      identificationNumber: '',
      phone: '',
      address: '',
      birthDate: '',
      bloodType: '',
      bloodFactor: '',
      sex: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('https://backend-justina-deploy.onrender.com/v1/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const res = await response.json()
      console.log(res)
    } catch (error) {
      console.error('Ocurio un error aqui', error)
    }
    console.log(values)
  }
  console.log(formSchema)

  const tipoSexo = ['M', 'F']
  const typoSangre = ['A', 'B', 'O', 'AB']
  const FactorSangre = ['+', '-']
  useEffect(() => {
    const token = localStorage.getItem('token') ?? ''
    setToken(token)
  },[])
  return (
    <section className='flex w-full flex-col p-5 ' style={{ display: register ? 'flex' : 'none' }}>
      {/**Logo que puede cambiar */}
      <Image
        src='/JustinaIO.svg'
        alt='JustinaIOLogo'
        className='dark:invert'
        width={400}
        height={300}
        priority
        style={{
          margin: 'auto',
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 40
        }}
      />

      <span className='text-center font-semibold'>#AyudemosAtodosLosQuePodamos</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 '>
          <div className=' my-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
            <InputText form={form.control} name='firstName' label='Nombre' placeholder='Escribe su nombre' type='text' className='text-black' />
            <InputText form={form.control} name='lastName' label='Apellidos' placeholder='Escribe su Apellido' type='text' className='text-black' />
            <SelectPerfil form={form.control} name='sex' Selects={tipoSexo} label='Elige cual es tu sexo' placeholder='Masculino' />
          </div>
          <InputText form={form.control} name='email' label='Email' type='email' placeholder='Escribe su correo' className='text-black' />
          <InputText form={form.control} name='password' type='password' label='Contraseña' placeholder='Escribe su contraseña' className='text-black' />
          <div className=' my-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
            <InputText form={form.control} name='identificationNumber' label='Numero de identificación' placeholder='Escribe su identificación aquí' type='text' className='text-black' />
            <InputText form={form.control} name='phone' label='Numero de telefono' placeholder='Escribe el número de telefono' type='text' className='text-black' />
            <InputText form={form.control} name='address' label='Numero de dirección' placeholder='Escribe su dirección' type='text' className='text-black' />
          </div>
          <div className=' my-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
            <SelectPerfil form={form.control} name='bloodType' label='Tipo de sangre' placeholder='A' Selects={typoSangre} />
            <SelectPerfil form={form.control} name='bloodFactor' label='Factor de sangre' placeholder='+' Selects={FactorSangre} />
            <InputText form={form.control} name='birthDate' label='Fecha de nacimiento' placeholder='DIA/MES/AÑO' type='date' className='text-black' />
          </div>
         {/**
          * 
          * <Button
            onClick={() => {
              setDesplegue(!desplegue)
            }}
          >
            Seleccione su perfil {'->'}
          </Button>
          <FormField
            control={form.control}
            name='perfil'
            render={({ field }) => (
              <section
                className='container-radios flex-col rounded-lg bg-white px-4 py-2 text-black'
                style={{
                  display: desplegue ? 'flex' : 'none'
                }}
              >
                <FormItem className='flex items-center justify-between'>
                  <FormLabel>Paciente</FormLabel>
                  <FormControl>
                    <Input
                      className='w-6'
                      type='radio'
                      placeholder='paciente'
                      defaultChecked
                      {...field}
                      value={'paciente'}
                      style={{
                        marginTop: 0
                      }}
                    />
                  </FormControl>
                </FormItem>

                <FormItem className='flex items-center justify-between'>
                  <FormLabel>Medico</FormLabel>
                  <FormControl>
                    <Input className='w-6' type='radio' placeholder='paciente' {...field} value={'medico'} />
                  </FormControl>
                </FormItem>

                <FormItem className='flex items-center justify-between'>
                  <FormLabel>Familiar del paciente</FormLabel>
                  <FormControl>
                    <Input
                      className='w-6'
                      type='radio'
                      placeholder='paciente'
                      {...field}
                      value={'familiar del paciente'}
                    />
                  </FormControl>
                </FormItem>

                <FormItem className='flex items-center justify-between'>
                  <FormLabel>Donador</FormLabel>
                  <FormControl>
                    <Input className='w-6' type='radio' placeholder='paciente' {...field} value={'donador'} />
                  </FormControl>
                </FormItem>
              </section>
            )}
          />
          */} 
          <Button type='submit' className='w-full rounded-none bg-pink-600 py-7'>
            Ingresar
          </Button>
        </form>
      </Form>
    </section>
  )
}
