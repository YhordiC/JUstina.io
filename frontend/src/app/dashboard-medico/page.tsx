"use client"
import AgendaHoy from '@/components/pages/medico/turnos/AgendaHoy'
import AgendaSemana from '@/components/pages/medico/turnos/AgendaSemana'
import SimpleDisplayData from '@/components/SimpleDisplayData.tsx/SimpleDisplayData'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MainDashboard = () => {
  return (
    <div>
      <h3 className='mb-2 text-3xl font-bold'>Turnos</h3>
      <Tabs defaultValue='agendaHoy' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='agendaHoy'>Agenda de hoy</TabsTrigger>
          <TabsTrigger value='agendaSemana'>Agenda extendida</TabsTrigger>
        </TabsList>
        <AgendaHoy />
        <AgendaSemana />
      </Tabs>
    </div>
  )
}

export default MainDashboard
