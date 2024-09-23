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
import { MoreHorizontalIcon } from 'lucide-react'

const columns = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'age',
    header: 'Edad'
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
    accessorKey: 'actions',
    header: 'Acciones',
    cell: () => {
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
            <DropdownMenuItem>Generar de nuevo</DropdownMenuItem>
            <DropdownMenuItem>Exportar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const dataMock = [
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Bob Smith',
    age: 35,
    email: 'bob@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Bob Smith',
    age: 35,
    email: 'bob@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Bob Smith',
    age: 35,
    email: 'bob@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Bob Smith',
    age: 35,
    email: 'bob@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'Bob Smith',
    age: 35,
    email: 'bob@example.com',
    phone: '+1 123-456-7890'
  },
  {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    phone: '+1 123-456-7890'
  }
]

function LogsTable() {
  return (
    <DataTable
      perficiente={
      {
        firstName: 'Nonbre',
        lastName: 'APellido',
        description: 'MI vida es salud',
        email: 'a@gamil.com',
        phone: '5452121515',
        medicalRegistrationNumber: 5452121,
        specialities: 'CIrujano',
        active: true

      }
    } columns={columns} data={dataMock} Roll='paciente' isOpen isfuncion={() => {}}
    />
  )
}

export { LogsTable }
