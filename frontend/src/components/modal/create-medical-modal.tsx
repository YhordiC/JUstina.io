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
import { useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { TokenContext } from '@/context/TokenProvider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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
  specialities: z.string().min(1, { message: 'El especialidad es obligatoria' }),
  description: z.string().min(1, { message: 'La descripción es obligatoria' }),
  active: z.boolean()
})

const especialidades = [
  { label: 'Alergología e Inmunología', value: 'ALERGIA_E_INMUNOLOGIA' },
  { label: 'Alergología e Inmunología Pediátrica', value: 'ALERGIA_E_INMUNOLOGIA_PEDIATRICA' },
  { label: 'Anatomía Patológica', value: 'ANATOMIA_PATOLOGICA' },
  { label: 'Anestesiología', value: 'ANESTESIOLOGIA' },
  { label: 'Anestesiología General y Hemodinamia', value: 'ANESTESIOLOGIA_GENERAL_Y_HEMODINAMIA' },
  { label: 'Cardiología', value: 'CARDIOLOGIA' },
  { label: 'Cardiología Infantil', value: 'CARDIOLOGIA_INFANTIL' },
  { label: 'Cirugía Cardiovascular', value: 'CIRUGIA_CARDIOVASCULAR' },
  { label: 'Cirugía Cardiovascular Pediátrica', value: 'CIRUGIA_CARDIOVASCULAR_PEDIATRICA' },
  { label: 'Cirugía de Cabeza y Cuello', value: 'CIRUGIA_CABEZA_Y_CUELLO' },
  { label: 'Cirugía Torácica', value: 'CIRUGIA_TORACICA' },
  { label: 'Cirugía Pediátrica', value: 'CIRUGIA_PEDIATRICA' },
  { label: 'Cirugía Plástica y Reparadora', value: 'CIRUGIA_PLASTICA_Y_REPARADORA' },
  { label: 'Cirugía Vascular Periférica', value: 'CIRUGIA_VASCULAR_PERIFERICA' },
  { label: 'Clínica Médica', value: 'CLINICA_MEDICA' },
  { label: 'Coloproctología', value: 'COLOPROCTOLOGIA' },
  { label: 'Dermatología', value: 'DERMATOLOGIA' },
  { label: 'Dermatología Pediátrica', value: 'DERMATOLOGIA_PEDIATRICA' },
  { label: 'Diagnóstico por Imágenes', value: 'DIAGNOSTICO_POR_IMAGENES' },
  { label: 'Electrofisiología Cardíaca', value: 'ELECTRO_FISIOLOGIA_CARDIACA' },
  { label: 'Emergentología', value: 'EMERGENTOLOGIA' },
  { label: 'Endocrinología', value: 'ENDOCRINOLOGIA' },
  { label: 'Endocrinología Infantil', value: 'ENDOCRINOLOGIA_INFANTIL' },
  { label: 'Farmacología Clínica', value: 'FARMACOLOGIA_CLINICA' },
  { label: 'Fisiatría', value: 'FISIATRIA' },
  { label: 'Gastroenterología', value: 'GASTROENTEROLOGIA' },
  { label: 'Gastroenterología Infantil', value: 'GASTROENTEROLOGIA_INFANTIL' },
  { label: 'Genética Médica', value: 'GENETICA_MEDICA' },
  { label: 'Geriatría', value: 'GERIATRIA' },
  { label: 'Ginecología', value: 'GINECOLOGOGIA' },
  { label: 'Hematología', value: 'HEMATOLOGIA' },
  { label: 'Hematooncología Pediátrica', value: 'HEMATOONCOLOGIA_PEDIATRICA' },
  { label: 'Hemoterapia e Inmunohematología', value: 'HEMOTERAPIA_E_INMUNOHEMATOLOGIA' },
  { label: 'Hepatología', value: 'HEPATOLOGIA' },
  { label: 'Hepatología Pediátrica', value: 'HEPATOLOGIA_PEDIATRICA' },
  { label: 'Infectología', value: 'INFECTOLOGIA' },
  { label: 'Infectología Infantil', value: 'INFECTOLOGIA_INFANTIL' },
  { label: 'Medicina del Deporte', value: 'MEDICINA_DEL_DEPORTE' },
  { label: 'Medicina del Trabajo', value: 'MEDICINA_DEL_TRABAJO' },
  { label: 'Medicina General', value: 'MEDICINA_GENERAL' },
  { label: 'Medicina Legal', value: 'MEDICINA_LEGAL' },
  { label: 'Medicina Nuclear', value: 'MEDICINA_NUCLEAR' },
  { label: 'Medicina Paliativa', value: 'MEDICINA_PALIATIVA' },
  { label: 'Nefrología', value: 'NEFROLOGIA' },
  { label: 'Nefrología Infantil', value: 'NEFROLOGIA_INFANTIL' },
  { label: 'Neonatología', value: 'NEONATOLOGIA' },
  { label: 'Neumonología', value: 'NEUMONOLOGIA' },
  { label: 'Neumonología Infantil', value: 'NEUMONOLOGIA_INFANTIL' },
  { label: 'Neurocirugía', value: 'NEUROCIRUGIA' },
  { label: 'Neurología', value: 'NEUROLOGIA' },
  { label: 'Neurología Infantil', value: 'NEUROLOGIA_INFANTIL' },
  { label: 'Nutrición', value: 'NUTRICION' },
  { label: 'Nutrición Infantil', value: 'NUTRICION_INFANTIL' },
  { label: 'Obstetricia', value: 'OBSTETRICIA' },
  { label: 'Odontología', value: 'ODONTOLOGIA' },
  { label: 'Oftalmología', value: 'OFTALMOLOGIA' },
  { label: 'Oncología', value: 'ONCOLOGIA' },
  { label: 'Ortopedia y Traumatología', value: 'ORTOPEDIA_Y_TRAUMATOLOGIA' },
  { label: 'Ortopedia y Traumatología Infantil', value: 'ORTOPEDIA_Y_TRAUMATOLOGIA_INFANTIL' },
  { label: 'Otorrinolaringología', value: 'OTORRINOLARINGOLOGIA' },
  { label: 'Pediatría', value: 'PEDIATRIA' },
  { label: 'Psicología', value: 'PSICOLOGIA' },
  { label: 'Psiquiatría', value: 'PSIQUIATRIA' },
  { label: 'Psiquiatría Infantojuvenil', value: 'PSIQUIATRIA_INFANTOJUVENIL' },
  { label: 'Radioterapia', value: 'RADIOTERAPIA' },
  { label: 'Reumatología', value: 'REUMATOLOGIA' },
  { label: 'Reumatología Infantil', value: 'REUMATOLOGIA_INFANTIL' },
  { label: 'Terapia Intensiva', value: 'TERAPIA_INTENSIVA' },
  { label: 'Terapia Intensiva Infantil', value: 'TERAPIA_INTENSIVA_INFANTIL' },
  { label: 'Tocoginecología', value: 'TOCOGINECOLOGIA' },
  { label: 'Toxicología', value: 'TOXICOLOGIA' },
  { label: 'Urología', value: 'UROLOGIA' }
]

function CreateMedicalModal() {
  const token = useContext(TokenContext) // contexto de token
  const [Especialidades, setEspecilaidades] = useState(especialidades)
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
      specialities: '',
      description: '',
      active: true
    }
  })

  const onSubmit = async (data: z.infer<typeof medicalSchema>) => {
    try {
      await fetch('https://backend-justina-deploy.onrender.com/api/medical/add', {
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
              name='specialities'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una especialidad' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Especialidades.map( item => (
                        <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
