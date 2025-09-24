'use client'
import Button from '@/components/ui/Button/Button'
import LogoSVG from '@/components/ui/Logo/Logo'
import { useGetCategoriesQuery } from '@/redux/slices/apiSlice'
import { GradientTextH2, Line } from '@/styles/globalStyles'
import { CiFacebook } from "react-icons/ci"
import { FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { LuInstagram } from "react-icons/lu"
import { MdEmail } from "react-icons/md"
import { FooterColummn, FooterContainer, FooterContent, FooterCopyright, FooterSocialLinks } from './FooterStyles'

const getCurrentYear = () => {
  const date = new Date()
  return date.getFullYear()
}

const Footer = () => {
  const { data: categories } = useGetCategoriesQuery()

  return (
    <FooterContainer>
      <FooterContent className='container'>
        <FooterColummn>
          <LogoSVG />
          <p>Transformando momentos simples em experiências especiais com nossas canecas únicas e personalizadas.</p>
          <FooterSocialLinks>
            <Button className='instagram' variant="primary" size="xs" title="instagram" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" leftIcon={<LuInstagram />} />
            <Button className='facebook' variant="primary" size="xs" title="Facebook" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" leftIcon={<CiFacebook />} />
            <Button className='twitter' variant="primary" size="xs" title="twitter" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" leftIcon={<FaTwitter />} />
            <Button className='whatsapp' variant="primary" size="xs" title="whatsapp" href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" leftIcon={<FaWhatsapp />} />
          </FooterSocialLinks>
        </FooterColummn>
        <FooterColummn>
          <GradientTextH2>Links uteis</GradientTextH2>
          <ul>
            <li><Button variant="link" href="/">Home</Button></li>
            <li><Button variant="link" href="/#sobre">Sobre</Button></li>
            <li><Button variant="link" href="/#maisVendidos">Mais vendidos</Button></li>
            <li><Button variant="link" href="/#contato">Contato</Button></li>
          </ul>
        </FooterColummn>
        <FooterColummn>
          <GradientTextH2>Categorias</GradientTextH2>
          {categories?.slice(0, 4).map(category => (
            <li key={category.id}>
              <Button variant="link" href="/products">{category.name}</Button>
            </li>
          ))}
        </FooterColummn>
        <FooterColummn>
          <GradientTextH2>Contato</GradientTextH2>
          <Button variant="link" size="xs" title="whatsapp" target="_blank" rel="noopener noreferrer" leftIcon={<FaWhatsapp />} >
            Contato: (11) 9999-9999
          </Button>
          <Button variant="link" size="xs" title="instagram" target="_blank" rel="noopener noreferrer" leftIcon={<MdEmail />} >
            Email: 2XlF9@example.com
          </Button>
          <Button variant="link" size="xs" title="instagram" target="_blank" rel="noopener noreferrer" leftIcon={<FaLocationDot />} >
            Endereço: Rua Exemplo, 123, Cidade Exemplo, Estado Exemplo
          </Button>
        </FooterColummn>
      </FooterContent>
      <FooterCopyright>
        <Line />
        &copy; {getCurrentYear()} RNT Projects. Todos os direitos reservados.
        <div>
          <Button size='xs' variant="link" href="/politica-de-privacidade">Politica de privacidade</Button>
          <Button size='xs' variant="link" href="/termos-de-uso">Termos de uso</Button>
          <Button size='xs' variant="link" href="/troca-e-devolucao">Troca e devolução</Button>
        </div>
      </FooterCopyright>
    </FooterContainer>
  )
}

export default Footer
