import React from 'react'
import PerfildevDato from '@/components/pages/medico/PerfildevDato'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

/** const Perfilmedico = [
  {
    firstName: 'Nonbre',
    lastName: 'APellido',
    description: 'MI vida es salud',
    email: 'a@gamil.com',
    phone: '5452121515',
    medicalRegistrationNumber: 5452121,
    specialities: 'CIrujano'
  }
]
const perfilpaciente = [
  {
    firstName: 'Nombre',
    lastName: 'Apellido',
    description: 'Valor unico',
    email: '@gmail.com',
    identificationNumber: '12345565',
    phone: '655611223',
    birthDate: 'Fecha',
    bloodType: 'Tipo de sangre',
    bloodFactor: 'Factor de sangre',
    sex: 'Sexualidad',
    medicalRegistrationNumber: 4656155,
    specialities: 'Especialidad',
    active: true
  }]
**/
interface Perfilmedico {
  firstName: string
  lastName: string
  description: string
  email: string
  phone: string
  medicalRegistrationNumber: number
  specialities: string
  active: boolean
}

interface Perfil {
  firstName: string
  lastName: string
  description: string
  email: string
  identificationNumber: string
  phone: string
  birthDate: string
  bloodType: string
  bloodFactor: string
  sex: string
  active: boolean
}

type profile = Perfilmedico | Perfil

export default function PerfilMedical({ isOPen = true, onCheneClose, Perfilmedico, Rol }: { isOPen: boolean, onCheneClose: () => void, Perfilmedico: profile, Rol: string }) {
  const profile = Perfilmedico
  return (
    <Dialog open={isOPen} onOpenChange={onCheneClose}>
      <DialogContent>
        <div
          className=' bg-white w-full max-w-2xl p-5 rounded-xl transition-all'
        >
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle>Perfil de {profile.firstName}</DialogTitle>
            <DialogDescription>{profile.description}</DialogDescription>
          </DialogHeader>
          <h6 className='text-center mb-4 text-2xl font-semibold' />
          <div className='grid  gap-4 sm:p-4 sm:grid-cols-2 '>
            {'medicalRegistrationNumber' in profile
              ? <>
                <PerfildevDato titulo='Nombre' parafo={profile.firstName} />
                <PerfildevDato titulo='Apellido' parafo={profile.lastName} />
                <PerfildevDato titulo='Correo' parafo={profile.email} />
                <PerfildevDato titulo='Telefono' parafo={profile.phone} />
                <PerfildevDato titulo='Numero de registro' parafo={profile.medicalRegistrationNumber.toString()} />
                <PerfildevDato titulo='Especialidades' parafo={profile.specialities} />
                <PerfildevDato titulo='Descripción' parafo={profile.description} />
              </>
              : <>
                <PerfildevDato titulo='Nombre' parafo={profile.firstName} />
                <PerfildevDato titulo='Apellido' parafo={profile.lastName} />
                <PerfildevDato titulo='Correo' parafo={profile.email} />
                <PerfildevDato titulo='Número de identifiación' parafo={profile.identificationNumber} />
                <PerfildevDato titulo='Telefono' parafo={profile.phone} />
                <PerfildevDato titulo='Fecha' parafo={profile.birthDate} />
                <PerfildevDato titulo='Tipo de sangre' parafo={profile.birthDate} />
                <PerfildevDato titulo='Factor de sangre' parafo={profile.bloodFactor} />
                <PerfildevDato titulo='Sexo' parafo={profile.sex} />
              </>}
            <div>
              <p className='text-xl font-medium'>Estado</p>
              <p>{profile.active ? 'Activo' : 'Deshabilitado'}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
