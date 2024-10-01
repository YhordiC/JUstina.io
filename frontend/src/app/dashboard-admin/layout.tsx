'use client'
import UserIcon from '@/components/iconsComponents/UserIcon'
import SideBar from '@/components/sidebar/SideBar'
import SideBarLink from '@/components/sidebar/SideBarLink'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const rutasUser = [
    { texto: 'Inicio', href: '/dashboard', icon: <UserIcon /> },
    { texto: 'Usuarios', href: '/dashboard/usuarios', icon: <UserIcon /> },
    { texto: 'Productos', href: '/dashboard/productos', icon: <UserIcon /> },
    { texto: 'Ventas', href: '/dashboard/ventas', icon: <UserIcon /> }
  ]

  return (
    <section className='container mx-auto flex h-full gap-5 py-2 pl-0'>
      <aside className='container-sidebar fixed left-[-270px] h-full overflow-hidden rounded-[30px] border-r border-gray-400 bg-white lg:relative lg:left-0 lg:flex-1'>
        <SideBar>
          {rutasUser.map((item) => {
            return <SideBarLink key={item.texto} href={item.href} icon={item.icon} texto={item.texto} />
          })}
        </SideBar>
      </aside>
      <main className='ml-[80px] flex-[2.5] overflow-hidden rounded-[30px] border-r border-gray-400 bg-white p-6 lg:ml-0'>
        {children}
      </main>
    </section>
  )
}
