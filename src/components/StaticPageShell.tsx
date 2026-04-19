import Link from 'next/link';
import { CloudSun } from 'lucide-react';

const NAV_LINKS = [
  { href: '/about',   label: 'About'   },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms'   },
];

interface Props {
  children: React.ReactNode;
}

export default function StaticPageShell({ children }: Props) {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #0f0f0f 0%, #1a1713 100%)' }}>
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl glass">
            <CloudSun className="h-5 w-5 text-lime" />
          </div>
          <span className="text-lg font-medium tracking-wide text-white group-hover:text-white/80 transition-colors">
            Lime Weather
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/50">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white/90 transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {children}
      </main>

      <footer className="mx-auto max-w-4xl border-t border-white/10 px-6 py-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
        <span>© {new Date().getFullYear()} Lime Weather</span>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white/60 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
