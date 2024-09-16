'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from '../ui/use-toast'
import { TokenContext } from '@/context/TokenProvider'

const patientSchema = z.object({
  firstName: z.string().min(1, { message: 'El nombre es obligatorio' }),
  lastName: z.string().min(1, { message: 'El apellido es obligatorio' }),
  identificationNumber: z.coerce
    .number({ required_error: 'El número de identificación es obligatorio' })
    .positive({ message: 'El número de identificación debe ser positivo' }),
  email: z.string({ required_error: 'El email es obligatorio' }).email({ message: 'El email es incorrecto' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
  phone: z.coerce
    .number({ required_error: 'El teléfono es obligatorio', invalid_type_error: 'El teléfono es incorrecto' })
    .positive({ message: 'El teléfono debe ser positivo' }),
  address: z.string().min(1, { message: 'La dirección es obligatoria' }),
  birthDate: z.string().min(1, { message: 'La fecha de nacimiento es obligatoria' }),
  bloodType: z.string().min(1, { message: 'El tipo de sangre es obligatorio' }),
  bloodFactor: z.string().min(1, { message: 'El factor de sangre es obligatorio' }),
  sex: z.enum(['M', 'F'], { required_error: 'El sexo es obligatorio' })
})

function CreatePatientModal() {
  const token = useContext(TokenContext) // contexto de token
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      identificationNumber: 0,
      email: '',
      password: '',
      phone: 0,
      address: '',
      birthDate: '',
      bloodType: '',
      bloodFactor: '',
      sex: undefined
    }
  })

  const onSubmit = async (data: z.infer<typeof patientSchema>) => {
    try {
      await fetch('https://backend-justina-deploy.onrender.com/api/patient/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      form.reset()
      setIsOpen(false)
      toast({ title: '¡Se ha creado el paciente!' })
    } catch (error) {
      toast({ title: 'Ha ocurrido un error al crear el paciente' })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='mx-auto'>Crear paciente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo paciente</DialogTitle>
          <DialogDescription>Completa los campos para crear un nuevo paciente.</DialogDescription>
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
              name='identificationNumber'
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder='Calle 123, Apartamento 1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input type='date' placeholder='dd/mm/aaaa' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bloodType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de sangre</FormLabel>
                  <FormControl>
                    <Input placeholder='A+' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bloodFactor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Factor de sangre</FormLabel>
                  <FormControl>
                    <Input placeholder='A+' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sex'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un sexo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='M'>Masculino</SelectItem>
                      <SelectItem value='F'>Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='col-span-full mx-auto mt-4 w-full max-w-xs'
              type='submit'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2Icon className='animate-spin' size={16} /> : 'Crear paciente'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { CreatePatientModal }
