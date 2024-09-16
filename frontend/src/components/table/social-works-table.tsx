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
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Desactivar</DropdownMenuItem>
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

function SocialWorksTable() {
  return <DataTable columns={columns} data={dataMock} isFunction={{}} isOpen perfilmedico={[]} />
}

export { SocialWorksTable }
