'use client';

import Loading from "@/app/(public)/loading";
import AddressManager from "@/components/ui/AddressManager/AddressManager";
import { Box } from "@/components/ui/Box/Box";
import Button from "@/components/ui/Button/Button";
import HamburgerMenu, { HamburgerMenuWindow } from "@/components/ui/HamburgerMenu/HamburgerMenu";
import UserOrders from "@/components/ui/UserOrders/UserOrders";
import {
  useGetOrdersQuery,
  useVerifyUserQuery
} from "@/redux/slices/apiSlice";
import { TitleH2 } from "@/styles/globalStyles";
import { useState } from "react";
import { FaBoxOpen, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { ProfileContainer, ProfileContent, ProfileNav, ProfileSection } from "./profileStyles";

type ProfileActiveSection = 'pedidos' | 'enderecos' | 'dados';

export default function Profile() {
  const [activeSection, setActiveSection] = useState<ProfileActiveSection>('pedidos');
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useVerifyUserQuery();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery(undefined, {
    skip: !user,
  });

  if (isUserLoading || !user) {
    return <Loading />;
  }

  const NavMenu = () => (
    <>
      <Button variant="ghost" size="sm" leftIcon={<FaBoxOpen />} $isActive={activeSection === 'pedidos'} onClick={() => { setActiveSection('pedidos'); setIsHamburgerOpen(false); }}>
        Meus Pedidos
      </Button>
      <Button variant="ghost" size="sm" leftIcon={<FaMapMarkerAlt />} $isActive={activeSection === 'enderecos'} onClick={() => { setActiveSection('enderecos'); setIsHamburgerOpen(false); }}>
        Meus Endereços
      </Button>
      <Button variant="ghost" size="sm" leftIcon={<FaUserCircle />} $isActive={activeSection === 'dados'} onClick={() => { setActiveSection('dados'); setIsHamburgerOpen(false); }}>
        Meus Dados
      </Button>
    </>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'pedidos':
        if (isOrdersLoading) return <Loading />;
        return <UserOrders orders={orders ?? []} />;

      case 'enderecos':

        return (
          <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary" style={{ gap: '16px' }}>
            <TitleH2>Gerenciamento de Endereços</TitleH2>

            <AddressManager />
          </Box>
        );

      case 'dados':
        return (
          <Box width="lg" height="lg" $padding="md" $bgColor="primary">
            <TitleH2>Meus Dados</TitleH2>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <ProfileContainer>
      <HamburgerMenuWindow $isOpen={isHamburgerOpen}>
        <NavMenu />
      </HamburgerMenuWindow>
      <ProfileContent className="container">
        <ProfileNav>
          <Box height="sm" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="primary">
            <TitleH2>Minha Conta</TitleH2>
          </Box>
          <Box className="boxRow" height="lg" direction="column" $padding="sm" $justify="start" $align="start" $bgColor="primary">
            <NavMenu />
          </Box>
        </ProfileNav>
        <ProfileSection>
          <Box height="xm" direction="row" $padding="sm" $align="center" $bgColor="primary">
            <HamburgerMenu onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} $isOpen={isHamburgerOpen} />
            <TitleH2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</TitleH2>
          </Box>
          {renderSection()}
        </ProfileSection>
      </ProfileContent>
    </ProfileContainer>
  );
}
