import Image from "next/image"
import { LogoContainer } from "./LogoStyles"

export default function LogoSVG() {
  return (
    <LogoContainer>
      <Image src="/images/baltazarte.svg" alt="Logo Baltazarte" fill priority />
    </LogoContainer>
  )
}

