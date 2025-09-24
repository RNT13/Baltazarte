'use client'

import Cart from '@/components/ui/Cart/Cart'
import LogoSVG from '@/components/ui/Logo/Logo'
import NavMenu from '@/components/ui/NavMenu/NavMenu'
import UserSection from '@/components/ui/UserSection/UserSection'
import { HeaderContainer, HeaderContent } from './HeaderStyles'

const Header = () => {

  return (
    <HeaderContainer>
      <HeaderContent className='container'>
        <LogoSVG />
        <NavMenu />
        <UserSection >
          <Cart />
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
