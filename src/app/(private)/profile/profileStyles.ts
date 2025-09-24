import { media } from '@/styles/theme'
import { styled } from 'styled-components'

export const ProfileContainer = styled.div`
  margin: 12px 0;
`

export const ProfileContent = styled.div`
  display: flex;
  gap: 12px;

  ${media.pc} {
    flex-direction: column;
  }
`

export const ProfileNav = styled.aside`
  height: 100%;
  width: 250px;
  position: sticky;
  top: calc(80px + 12px);
  border-radius: 16px;
  gap: 12px;
  display: flex;
  flex-direction: column;

  ${media.pc} {
    display: none;
  }
`

export const ProfileSection = styled.main`
  width: 100%;
  height: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-left: 42px;
  }
`
