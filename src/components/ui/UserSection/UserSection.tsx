'use client'

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { apiSlice, useLogoutUserMutation, useVerifyUserQuery } from "@/redux/slices/apiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuPanelsTopLeft } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import Button from "../Button/Button";
import { UserSectionAvatar, UserSectionButtons, UserSectionContainer, UserSectionContent, UserSectionWindow } from "./UserSectionStyles";

type UserSectionProps = {
  children?: React.ReactNode
}

export default function UserSection({ children }: UserSectionProps) {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { data: user, isLoading } = useVerifyUserQuery()
  const [logoutUser] = useLogoutUserMutation()
  const [windowOpen, setWindowOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      if (response.success) {
        toast.success('Logout realizado com sucesso!')
        dispatch(apiSlice.util.resetApiState())
        route.push('/')
        setWindowOpen(false)
      }
    } catch {
      toast.error('Erro ao fazer logout')
    }
  };

  const handleClick = () => {
    setWindowOpen(!windowOpen)
  }

  return (
    <UserSectionContainer>
      <UserSectionContent>

        {children}

        {isLoading ? null : user ? (
          <>
            <UserSectionAvatar title={user.name} >
              <RxAvatar />
              <Button variant="ghost" size="sm" title={user.name} onClick={() => setWindowOpen(!windowOpen)}>{user.name.slice(0, 6)}</Button>
            </UserSectionAvatar>
          </>
        ) : (
          <UserSectionButtons>
            <Button variant="pink" size="sm" title="Login" href="/login">Login</Button>
            <Button variant="pink" size="sm" title="Register" href="/register">Register</Button>
          </UserSectionButtons>
        )}

        <UserSectionWindow $isOpen={windowOpen}>
          {user ? (
            <div title={user.name} >
              {user.role === 'ADMIN' && (
                <Button variant="ghost" size="xs" title={user.name} leftIcon={<LuPanelsTopLeft />} onClick={handleClick} href="/admin">Painel Admin</Button>
              )}
              {user.role === 'USER' && (
                <Button variant="ghost" size="xs" title={user.name} leftIcon={<LuPanelsTopLeft />} onClick={handleClick} href="/profile">Perfil</Button>
              )}
            </div>
          ) : (
            null
          )}
          <Button variant="ghost" size="xs" type="button" title="Logout" leftIcon={<PiSignOutBold />} onClick={handleLogout}>Logout</Button>
        </UserSectionWindow>

      </UserSectionContent>
    </UserSectionContainer>
  )
}
