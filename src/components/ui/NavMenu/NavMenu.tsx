import Button from "../Button/Button";
import { NavMenuContainer, NavMenuContent, NavMenuItem, NavMenuList } from "./NavMenuStyles";

export default function NavMenu() {
  return (
    <NavMenuContent>
      <NavMenuContainer>
        <NavMenuList>
          <NavMenuItem>
            <Button variant="ghost" href="/" title="Sobre">Home</Button>
          </NavMenuItem>
          <NavMenuItem>
            <Button variant="ghost" href="/products" title="Sobre">Produtos</Button>
          </NavMenuItem>
        </NavMenuList>
      </NavMenuContainer>
    </NavMenuContent>
  )
}
