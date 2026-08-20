import { Link } from 'react-router-dom'

type PlaceholderScreenProps = {
  title: string
  description: string
}

const links = [
  { to: '/', label: 'Landing' },
  { to: '/terms', label: 'Terms' },
  { to: '/signup', label: 'Signup' },
  { to: '/welcome', label: 'Welcome' },
] as const

export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ext-accent">
        Extroverts
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-ext-muted">{description}</p>
      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        {links.map((link) => (
          <Link
            key={link.to}
            className="rounded-full border border-ext-border px-3 py-1.5 text-ext-text"
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
