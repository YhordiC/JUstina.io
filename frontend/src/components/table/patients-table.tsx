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
import { TokenContext } from '@/context/TokenProvider'
import { Patient } from '@/tipos/database'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, MoreHorizontalIcon, XIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'



function PatientsTable() {
  const [isOpenMperfil, setOpenMP] = useState(false)
  const [perfilPaciente, setPerfilPaciente] = useState([])
  const columns: ColumnDef<Patient>[] = [
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
      accessorKey: 'birthDate',
      header: 'Fecha de nacimiento'
    },
    {
      accessorKey: 'identificationNumber',
      header: 'Número de identificación'
    },
    {
      accessorKey: 'sex',
      header: 'Sexo'
    },
    {
      accessorKey: 'bloodType',
      header: 'Tipo de sangre'
    },
    {
      accessorKey: 'bloodFactor',
      header: 'Factor de sangre'
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
        const Paciente = row.original
        function CloseandOPenMP() {
          setOpenMP(!isOpenMperfil)
          const perfilpaciente = patients.filter(paciente => paciente.id === Paciente.id)
        setPerfilPaciente(perfilpaciente)
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
              <DropdownMenuItem>Desactivar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={CloseandOPenMP}>Ver perfil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
  const [patients, setPatients] = useState<Patient[]>([])
  const token = useContext(TokenContext) || '' // contexto de token;
  useEffect(() => {
    const Token = localStorage.getItem('token') ?? ''
    const getPatients = async () => {
      const request = await fetch('https://backend-justina-deploy.onrender.com/api/patient', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`
        }
      })
      const patients = await request.json()
      return patients
    }

    getPatients()
      .then((patients) => setPatients(patients.dataIterable))
      .catch((error) => console.log(error))
  }, [])
  function cambiarisOpen() {
    setOpenMP(!isOpenMperfil)
  }
  return <DataTable columns={columns} data={patients} isOpen={isOpenMperfil} isfuncion={cambiarisOpen} perfilmedico={perfilPaciente} />
}

export { PatientsTable }
