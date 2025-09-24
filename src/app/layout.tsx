import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import { Providers } from '@/components/providers'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import { GlobalStyles } from '@/styles/globalStyles'
import type { Metadata } from 'next'
import { Jersey_10, Pixelify_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'


const jersey_10 = Jersey_10({
  weight: '400',
  subsets: ['latin'],
  variable: '--secondary-font',
})

const pixelify_sans = Pixelify_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--primary-font',
})

export const metadata: Metadata = {
  title: 'Baltazarte',
  description: 'Aplicação Next.js criada com RNT CLI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${jersey_10.variable} ${pixelify_sans.variable}`} data-scroll-behavior="smooth">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Providers>
            <Header />
            {children}
            <Footer />
            <Toaster
              position="top-center"
              containerStyle={{
                top: 85,
              }}
              toastOptions={{
                duration: 2000,
                style: {
                  background: '#ebc6d3ff',
                  color: '#3f3c6eff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                },
                iconTheme: {
                  primary: '#3f3c6eff',
                  secondary: '#fbddf3',
                },
                error: {
                  style: {
                    background: '#fcd5d5',
                    color: '#b91c1c',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '0.9rem',
                  },
                  iconTheme: {
                    primary: '#b91c1c',
                    secondary: '#fcd5d5',
                  },
                },
              }}
            />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

