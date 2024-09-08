'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { TokenContext } from '@/context/TokenProvider'

const medicalSchema = z.object({
  firstName: z.string().min(1, { message: 'El nombre es obligatorio' }),
  lastName: z.string().min(1, { message: 'El apellido es obligatorio' }),
  email: z.string({ required_error: 'El email es obligatorio' }).email({ message: 'El email es incorrecto' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
  phone: z.coerce
    .number({ required_error: 'El teléfono es obligatorio', invalid_type_error: 'El teléfono es incorrecto' })
    .positive({ message: 'El teléfono debe ser positivo' }),
  medicalRegistrationNumber: z.coerce
    .number({ required_error: 'El número de identificación es obligatorio' })
    .positive({ message: 'El número de identificación debe ser positivo' }),
  specialty: z.string().min(1, { message: 'El especialidad es obligatoria' }),
  description: z.string().min(1, { message: 'La descripción es obligatoria' }),
  active: z.boolean()
})

function CreateMedicalModal() {
  const token = useContext(TokenContext) // contexto de token
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof medicalSchema>>({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: 0,
      medicalRegistrationNumber: 0,
      specialty: '',
      description: '',
      active: true
    }
  })

  const onSubmit = async (data: z.infer<typeof medicalSchema>) => {
    try {
      await fetch('https://backend-justina-deploy.onrender.com/v1/api/medical-staff/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      form.reset()
      setIsOpen(false)
      toast({ title: '¡Se ha creado el médico!' })
    } catch (error) {
      toast({ title: 'Ha ocurrido un error al crear el médico' })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='mx-auto'>Crear médico</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo médico</DialogTitle>
          <DialogDescription>Completa los campos para crear un nuevo médico.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-x-4 gap-y-2 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='john@doe.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='*********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type='tel' placeholder='+34567890123' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='medicalRegistrationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de identificación</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='123456789' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='specialty'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Input placeholder='Cirugía general' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder='Este es un ejemplo de descripción' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='col-span-full mx-auto mt-4 w-full max-w-xs'
              type='submit'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2Icon className='animate-spin' size={16} /> : 'Crear médico'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateMedicalModal }
