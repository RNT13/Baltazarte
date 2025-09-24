import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const AdminContainer = styled.div`
  margin: 12px 0px;
`

export const AdminContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  ${media.pc} {
    flex-direction: column;
  }
`

export const AdminLeftSide = styled.div`
  height: 100%;
  width: 250px;
  position: sticky;
  top: calc(80px + 12px);
  border-radius: 16px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.pc} {
    display: none;
  }
`

export const AdminCenterSide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    > h2 {
      margin-left: 42px;
    }
  }
`

export const AdminCenterSideHeader = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const AdminCenterSideCard = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  div {
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;

      ${media.mobile} {
        flex-direction: row;
      }

      svg {
        font-size: 32px;
        color: ${theme.colors.fifthColor};
      }
    }
  }

  p {
    color: ${theme.colors.fifthColor};
    font-weight: 600;
    font-size: 20px;
  }

  .greenAye {
    color: ${theme.colors.baseGreen.dark20};
  }

  .redAye {
    color: ${theme.colors.baseRed.dark20};
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.tablet} {
    p {
      font-size: 14px;
    }
  }
`

export const AdminCenterSideBody = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div:first-child {
    width: 100%;
    height: 100%;

    ${media.mobile} {
      display: flex;
      flex-direction: column;
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
