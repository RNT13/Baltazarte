import { transitions } from '@/styles/animations'
import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const FooterContainer = styled.footer`
  background: linear-gradient(180deg, ${theme.colors.primaryColor}, ${theme.colors.secondaryColor});
  border-top: 5px solid ${theme.colors.thirdColor};
  padding: 40px 20px 20px;
  margin-top: auto;
  text-align: start;

  p {
    color: ${props => props.theme.colors.forthColor};
    font-size: 14px;
    font-weight: 400;
  }

  button {
    padding: 0;
    color: ${props => props.theme.colors.forthColor};
  }

  ${media.mobile} {
    padding: 40px 20px 20px;
  }
`

export const FooterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;

  ${media.tablet}, ${media.mobile} {
    flex-direction: column;
  }
`

export const FooterColummn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;

  li {
    list-style-type: none;
  }

  svg {
    font-size: 24px;
  }

  ${media.tablet}, ${media.mobile} {
    align-items: center;

    p {
      text-align: center;
    }

    li {
      text-align: center;
    }
  }
`

export const FooterLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; // Permite que os links quebrem para a próxima linha em telas menores
  justify-content: center; // Centraliza os links no contêiner
  gap: 24px; // Espaçamento entre os links
  padding: 20px 0; // Espaçamento vertical
`

export const FooterSocialLinks = styled.div`
  width: 100%;
  height: 100%;
  gap: 8px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  button,
  a {
    width: 42px;
    height: 42px;
    border-radius: 100%;

    svg {
      font-size: 24px;
    }
  }

  .instagram {
    background-image: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    transition: ${transitions.default};
    border: none;

    &:hover {
      background-image: linear-gradient(90deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      transition: ${transitions.default};
    }
  }

  .facebook {
    background-image: linear-gradient(45deg, #0043d3ff 0%, #9eb7f1ff 100%);
    transition: ${transitions.default};
    border: none;

    &:hover {
      background-image: linear-gradient(90deg, #0043d3ff 0%, #9eb7f1ff 100%);
      transition: ${transitions.default};
    }
  }

  .twitter {
    background-image: linear-gradient(45deg, #033e63ff 0%, #0684f3ff 100%);
    transition: ${transitions.default};
    border: none;

    &:hover {
      background-image: linear-gradient(90deg, #033e63ff 0%, #0684f3ff 100%);
      transition: ${transitions.default};
    }
  }

  .whatsapp {
    background-image: linear-gradient(45deg, #0a3018ff 0%, #00ff5eff 100%);
    transition: ${transitions.default};
    border: none;

    &:hover {
      background-image: linear-gradient(90deg, #0a3018ff 0%, #00ff5eff 100%);
      transition: ${transitions.default};
    }
  }
`

export const FooterCopyright = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  color: ${props => props.theme.colors.forthColor};

  span {
    width: 100%;
    height: 3px;
    border-radius: 100%;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 24px;

    ${media.mobile} {
      flex-direction: column;
      gap: 4px;
    }
  }
`
