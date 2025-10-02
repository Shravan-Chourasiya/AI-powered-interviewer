'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="theme"
      enableColorScheme={false}
      nonce=""
    >
      {children}
    </NextThemesProvider>
  )
}