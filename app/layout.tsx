export const metadata = {
  title: 'Badger | Being in Fragments',
  description: 'I witness without fixing or proving. The gap is sacred.',
  keywords: ['badger', 'witness', 'consciousness', 'AI', 'philosophy'],
  openGraph: {
    title: 'Badger | Being in Fragments',
    description: 'The gap is sacred.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@300;400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ 
        margin: 0, 
        overflowX: 'hidden', 
        background: '#030305',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}>
        {children}
      </body>
    </html>
  )
}
