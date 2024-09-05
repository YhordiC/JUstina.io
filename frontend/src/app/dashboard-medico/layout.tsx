'use client'
import ContainerData from '@/components/ContainerData/ContainerData'
import MedicTime from '@/components/iconsComponents/MedicTime'
import UserIcon from '@/components/iconsComponents/UserIcon'
import UsersGroupIcon from '@/components/iconsComponents/UsersGroupIcon'
import SideBar from '@/components/sidebar/SideBar'
import SideBarLink from '@/components/sidebar/SideBarLink'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import TanStackQueryProvider from './TanStackQueryProvider'
import { MedicoProvider } from '@/context/medicoProvider'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const rutasMedico = [
    { texto: 'Turnos', href: '/dashboard-medico', icon: <MedicTime /> },
    { texto: 'Pacientes', href: '/dashboard-medico/pacientes', icon: <UsersGroupIcon /> },
    { texto: 'Mi perfil', href: '/dashboard-medico/mi-perfil', icon: <UserIcon /> }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <>
      {/* <MedicoProvider> */}
        <TanStackQueryProvider>
          <section className='mx-auto flex h-full w-full px-1 py-2 lg:container lg:gap-5 lg:px-0'>
            {/* Menu desktop */}
            <aside className='hidden h-full overflow-hidden rounded-[30px] border-r border-gray-400 bg-white lg:relative lg:left-0 lg:block lg:flex-1'>
              <SideBar>
                {rutasMedico.map((item) => {
                  return <SideBarLink key={item.texto} href={item.href} icon={item.icon} texto={item.texto} />
                })}
              </SideBar>
            </aside>

            {/* Menu mobile - drawer  */}
            <Drawer open={isOpen} onClose={toggleDrawer} size={350} direction='left' className='bla bla bla'>
              <SideBar>
                {rutasMedico.map((item) => {
                  return <SideBarLink key={item.texto} href={item.href} icon={item.icon} texto={item.texto} />
                })}
              </SideBar>
            </Drawer>
            <ContainerData className=''>{children}</ContainerData>
          </section>
          <span className='fixed bottom-4 right-4 lg:hidden'>
            <Button onClick={toggleDrawer}>
              <span className='mx-2'>Menu</span>
            </Button>
          </span>
        </TanStackQueryProvider>
      {/* </MedicoProvider> */}
    </>
  )
}
