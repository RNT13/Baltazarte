import { TitleH2 } from "@/styles/globalStyles";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import Button from "../Button/Button";
import { HamburgerMenuButton, HamburgerMenuContainer, HamburgerMenuContent, HamburgerMenuWindowBody, HamburgerMenuWindowContainer, HamburgerMenuWindowHeader } from "./HamburgerMenuStyles";

interface HamburgerMenuProps {
  children?: React.ReactNode
  onClick?: () => void
  $isOpen?: boolean
}

export default function HamburgerMenu({ onClick, $isOpen }: HamburgerMenuProps) {
  return (
    <HamburgerMenuContainer>
      <HamburgerMenuContent>
        <HamburgerMenuButton>
          <Button variant="ghost" size="sm" title="Menu" leftIcon={$isOpen ? <RiMenuUnfold4Fill /> : <RiMenuUnfold3Fill />} onClick={onClick} />
        </HamburgerMenuButton>
      </HamburgerMenuContent>
    </HamburgerMenuContainer>
  )
}

export function HamburgerMenuWindow({ children, $isOpen }: HamburgerMenuProps) {
  return (
    <HamburgerMenuWindowContainer $isOpen={$isOpen}>
      <HamburgerMenuWindowHeader >
        <TitleH2>Menu</TitleH2>
      </HamburgerMenuWindowHeader>

      <HamburgerMenuWindowBody>
        {children}
      </HamburgerMenuWindowBody>
    </HamburgerMenuWindowContainer>
  )
}
