'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { object, z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode'
const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters'
  })
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const Enviar = (role = '') => {
    if (role === 'ROLE_PATIENT') {
      window.location.href = '/dashboard-paciente'
      return
    } else if (role === 'ROLE_ADMIN') {
      window.location.href = '/dashboard'
      return
    }
    window.location.href = '/dashboard-medico'
  }
  const [ErrorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch('https://backend-justina-deploy.onrender.com/v1/api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      setLoading(false)
      if (!response.ok) {
        const Message = 'El error es un error de autenticación, revise el correo y la contraseña son correctos'
        setErrorMessage(Message)
        throw new Error('Error de autenticación')
      }
      const token = await response.json()
      localStorage.setItem('token', token.jwtToken)
      console.log(token)
      const decoded:{role:string} = jwtDecode(token.jwtToken)
      console.log(decoded)
      Enviar(decoded.role)
    } catch (error) {
      setLoading(false)
      const Message = 'A ocurrido un error, revisa que tu correo y contraseña sean correctas, o puede que tu cuenta no exista'
      setErrorMessage(Message)
      console.error('Hubo un error de petición  ', error)
    }
    console.log(values)
  }
  console.log(formSchema)
  return (
    <section className='flex w-full flex-col  p-5 text-black relative'>
      {loading &&
        <div className='absolute inset-0 flex items-center justify-center'>
          <Image
            src='/loading.svg'
            alt='Icon de cargando'
            width={100}
            height={100}
            className='animate-spin mr-3    opacity-45  '
          />
        </div>}
      {/** Logo que puede cambiar */}
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Ingresa tu email' className='bg-white text-black' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Escribe tu contraseña'
                    className='bg-white text-black'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href='aqui entrara el link de page olvidaste contraseña' className='text-xs'>
            Olvidaste tu contraseña?
          </Link>{' '}
          <br />
          <Button type='submit' className='w-full rounded-none bg-pink-600 py-7'>
            Ingresar
          </Button>
        </form>
      </Form>
      {ErrorMessage && 
        <section className='max-w-96 text-white bg-black px-4 py-2 absolute bottom-0 right-[20%] left-[20%] rounded-sm space-y-3' >
          <div className='relative'><button onClick={() => setErrorMessage('')} className='absolute font-bold right-0 hover:scale-x-125 transition-transform'>X</button></div> 
          <h6 className='font-bold'>A ocurrido un error.</h6>
          <p className='text-sm'>{ErrorMessage}</p>
        </section>}
    </section>
  )
}
