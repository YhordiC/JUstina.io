'use client'
import { DataTable } from '@/components'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Medical } from '@/tipos/database'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, MoreHorizontalIcon, XIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { toast } from '../ui/use-toast'
import { TokenContext } from '@/context/TokenProvider'

const columns: ColumnDef<Medical>[] = [
  {
    accessorKey: 'firstName',
    header: 'Nombre'
  },
  {
    accessorKey: 'lastName',
    header: 'Apellido'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono'
  },
  {
    accessorKey: 'medicalRegistrationNumber',
    header: 'Número de identificación',
    cell: (cell) => <span className='flex items-center justify-center'>{cell.getValue() as number}</span>
  },
  {
    accessorKey: 'specialities',
    header: 'Especialidades'
  },
  {
    accessorKey: 'active',
    header: 'Activo',
    cell: (cell) => (
      <span className='flex items-center justify-center'>
        {cell.getValue() ? <CheckIcon size={20} /> : <XIcon size={20} />}
      </span>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const medical = row.original

      const handleOnDisable = async () => {
        const token = useContext(TokenContext) || "" // contexto de token
        try {
          await fetch(`https://backend-justina-deploy.onrender.com/v1/api/medical-staff/delete/${medical.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          })

          toast({ title: '¡Se ha desactivado el médico!' })
        } catch (error) {
          toast({ title: 'Ha ocurrido un error al eliminar el médico' })
        }
      }

      return (
        <DropdownMenu>
          <div className='flex items-center justify-center'>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOnDisable}>Desactivar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function MedicalsTable() {
 
  const [medicals, setMedicals] = useState<Medical[]>([])
  const token = useContext(TokenContext) || "" // contexto de token
  console.log(token)
  useEffect(() => {
   
    const getMedicals = async () => {
      const request = await fetch('https://backend-justina-deploy.onrender.com/v1/api/medical-staff/getAll', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const medicals = await request.json()
      return medicals
    }

    getMedicals()
      .then((medicals) => setMedicals(medicals))
      .catch((error) => console.log(error))
  }, [])

  return <DataTable columns={columns} data={medicals} />
}

export { MedicalsTable }
