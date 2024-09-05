"use client"
import ContainerData from '@/components/ContainerData/ContainerData'
import MedicTime from '@/components/iconsComponents/MedicTime'
import UserIcon from '@/components/iconsComponents/UserIcon'
import UsersGroupIcon from '@/components/iconsComponents/UsersGroupIcon'
import SideBar from '@/components/sidebar/SideBar'
import SideBarLink from '@/components/sidebar/SideBarLink'
import { Button } from '@/components/ui/button'
import { CodeIcon } from '@radix-ui/react-icons'
import { HistoryIcon, HomeIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import Drawer from 'react-modern-drawer'

import 'react-modern-drawer/dist/index.css'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const rutasUser = [
    { texto: 'Inicio', href: '/dashboard-paciente', icon: <HomeIcon /> },
    { texto: 'Perfil', href: '/dashboard-paciente/perfil', icon: <UserIcon /> }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <>
      <section className='mx-auto flex h-full w-full px-1 py-2 lg:container lg:gap-5 lg:px-0'>
        <aside className='hidden h-full overflow-hidden rounded-[30px] border-r border-gray-400 bg-white lg:relative lg:left-0 lg:block lg:flex-1'>
          <SideBar>
            {rutasUser.map((item) => {
              return <SideBarLink key={item.texto} href={item.href} icon={item.icon} texto={item.texto} />
            })}
          </SideBar>
        </aside>
        <Drawer open={isOpen} onClose={toggleDrawer} size={350} direction='left' className='bla bla bla'>
          <SideBar>
            {rutasUser.map((item: { texto: string; href: string; icon: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => {
              return <SideBarLink key={item.texto} href={item.href} icon={item.icon} texto={item.texto} />
            })}
          </SideBar>
          {isOpen &&
            <span className='absolute top-4 z-50 right-4 lg:hidden'>
              <Button onClick={toggleDrawer} className='bg-emerald-500'>
                <Image
                  src='/closeIcon.png'
                  alt='icono de close'
                  width={30}
                  height={30}
                />
              </Button>
            </span>}
        </Drawer>
        <ContainerData className='min-h-screen'>{children}</ContainerData>
      </section>
      {!isOpen &&
        <span className='absolute top-4 z-50 right-4 lg:hidden'>
          <Button onClick={toggleDrawer} className='bg-emerald-500'>
            <MenuIcon />
          </Button>
        </span>}
    </>
  )
}
