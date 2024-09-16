import React from 'react'
import PerfildevDato from '@/components/pages/medico/PerfildevDato'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const Perfilmedico = [
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
export default function PerfilMedical({ isOPen = true, onCheneClose = () => { console.log('nada') }, perfilmedico = Perfilmedico }) {
  return (
    <Dialog open={isOPen} onOpenChange={onCheneClose}>
      <DialogContent>
        <div
          className=' bg-white w-full max-w-2xl p-5 rounded-xl transition-all'
        >
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle>Perfil de {perfilmedico[0].firstName}</DialogTitle>
            <DialogDescription>{perfilmedico[0].description}</DialogDescription>
          </DialogHeader>
          <h6 className='text-center mb-4 text-2xl font-semibold' />
          <div className='grid  gap-4 sm:p-4 sm:grid-cols-2 '>
            <PerfildevDato titulo='Nombre' parafo={perfilmedico[0].firstName} />
            <PerfildevDato titulo='Apellido' parafo={perfilmedico[0].lastName} />
            <PerfildevDato titulo='Correo' parafo={perfilmedico[0].email} />
            <PerfildevDato titulo='Telefono' parafo={perfilmedico[0].phone} />
            <PerfildevDato titulo='Numero de registro' parafo={perfilmedico[0].medicalRegistrationNumber} />
            <PerfildevDato titulo='Especialidades' parafo={perfilmedico[0].specialities} />
            <PerfildevDato titulo='Descripción' parafo={perfilmedico[0].description} />
            <div>
              <p className='text-xl font-medium'>Estado</p>
              <p>{perfilmedico[0].active ? 'Activo' : 'Deshabilitado'}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
