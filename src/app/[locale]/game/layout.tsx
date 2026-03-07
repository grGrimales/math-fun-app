export const metadata = {
  title: 'MathFun - ¡A jugar!',
  description: 'Diviértete aprendiendo matemáticas',
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="game-container min-h-screen bg-background">
      {children}
    </div>
  )
}