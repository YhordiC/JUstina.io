"use client";


import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { FormValues, Formshema } from '@/app/lib/perfil_actions'

import InputText from '@/components/ui/Perfil/InputText'
import SelectPerfil from '@/components/ui/Perfil/SelectPerfil'
import TiposSangreRadio from '@/components/ui/Perfil/TiposSangreRadio'
import { jwtDecode } from 'jwt-decode'

export default function Perfilpage() {
  let [form] =  FormValues()
  const [formSchema] = Formshema()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    })
    console.log(values)
  }

  const ObrasSocial = ['Ayudar', 'Servir', 'Saber']
  const SelectsDocumentos = ['Carnet de identidad', 'CI', 'Otro documentos']
  const SelectBiologia = ['Hombre', 'Mujer', 'Intersexualidad']
  const SelectPatologia = ['Diabetes', 'Celiaquia', 'Ipertención', 'Calculo renal']
  
  return (
    <main>
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <section className='my-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
            <InputText form={form} label='Nombres/s' name='name' placeholder='Escriba su nombre' type='text' className='text-black' />
            <InputText form={form} label='Apellidos' name='last_name' placeholder='Escriba su apellido' type='text' className='text-black' />
            <SelectPerfil
              form={form}
              label='Obras social o prepara'
              Selects={ObrasSocial}
              name='obra_social'
              placeholder='Por favor elija uno'
            />
            <SelectPerfil
              form={form}
              label='Tipos de documentos'
              Selects={SelectsDocumentos}
              name='tipo_documento'
              placeholder='DNI'
            />
            <InputText
              form={form}
              label='Número de documentos'
              name='numero_documento'
              placeholder='Número de documentos'
              type='text' className='text-black'
            />
          </section>

          <hr />

          <section className='mt-7 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
            <section className='flex flex-col space-y-12 sm:col-span-2'>
              <TiposSangreRadio form={form} />
            </section>
            <SelectPerfil
              form={form}
              label='Biológicamente soy'
              Selects={SelectBiologia}
              name='biologia'
              placeholder='Seleccionar'
            />
            <InputText form={form} label='Fecha de nacimiento' name='fecha_nacimiento' placeholder='Dia/Mes/Año' type='date' className='text-black' />
            <SelectPerfil
              form={form}
              label='Patologías'
              Selects={SelectPatologia}
              name='patologia'
              placeholder='Seleccionar'
            />
            <FormField
              control={form.control}
              name='tarea_patologia'
              render={({ field }) => (
                <FormItem className='sm:col-span-3'>
                  <FormLabel className='mb-3'>Mi patología no aparece</FormLabel>
                  <FormControl>
                    <section>
                      <p className='pb-1 text-sm'>Enviar sugerencia</p>
                      <Textarea
                        placeholder='Aqui puedes agregar tu patologia si no esta.'
                        className='resize-none'
                        {...field}
                      />
                      <FormDescription>
                        <span>Aqui puedes agregar tu patología si no esta.</span>
                      </FormDescription>
                    </section>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button type='submit'>Guardar</Button>
        </form>
      </Form>
      <Toaster />
    </main>
  )
}
