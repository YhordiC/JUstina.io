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

function MedicalsTable() {
  const Token: string = useContext(TokenContext) || '' // contexto de token
  const [isOpenMperfil, setOpenMP] = useState(false)
  const [perfilMedico, setPerfilMedico] = useState<Medical[]>([])

  const columns: ColumnDef<Medical>[] =
  [
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
        function CloseandOPenMP() {
          setOpenMP(!isOpenMperfil)
          const perfilmedico = medicals.filter(medico => medico.id === medical.id)
          setPerfilMedico(perfilmedico)
        }
        console.log(medicals[0].id)
        const handleOnDisable = async () => {
          try {
            await fetch(`https://backend-justina-deploy.onrender.com/api/medical/delete/${medical.id}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${Token}`,
                'Content-Type': 'application/json'
              }
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={CloseandOPenMP}>Ver perfil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
  const [medicals, setMedicals] = useState<Medical[]>([])
  const token = useContext(TokenContext) || '' // contexto de token
  console.log(token)
  useEffect(() => {
    const Token = localStorage.getItem('token') ?? ''
    void fetch('https://backend-justina-deploy.onrender.com/api/medical', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
      .then(async res => await res.json())
      .then(data => setMedicals(data.dataIterable))
  }, [])
  function cambiarisOpen() {
    setOpenMP(!isOpenMperfil)
  }

  return <DataTable columns={columns} data={medicals} isOpen={isOpenMperfil} isFunction={cambiarisOpen} perfilmedico={perfilMedico} />
}

export { MedicalsTable }
