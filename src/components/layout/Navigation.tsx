import { useEffect, useState } from 'react'
import { navigationLinks } from '../../data/siteContent'
import { useNavigationTone } from '../../hooks/useNavigationTone'
import { BagIcon } from '../ui/Icons'
import { NavSearch } from './NavSearch'

interface NavigationProps {
  basketCount: number
}

export function Navigation({ basketCount }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const tone = useNavigationTone()

  useEffect(() => {
    document.documentElement.classList.toggle('is-menu-open', isMenuOpen)
    return () => document.documentElement.classList.remove('is-menu-open')
  }, [isMenuOpen])

  return (
    <header className={`nav nav--${tone}${isMenuOpen ? ' nav--open' : ''}`}>
      <a className="nav__logo" href="#top" aria-label="Terrarium Manikganj home">
        Terrarium<span aria-hidden="true">·</span><em>Manikganj</em>
      </a>

      <nav className="nav__links" aria-label="Primary navigation">
        <ul>
          {navigationLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav__utility">
        <NavSearch />
        <button className="nav__icon" type="button" aria-label={`Basket, ${basketCount} items`}>
          <BagIcon />
          <span className="nav__count" aria-hidden="true">{basketCount}</span>
        </button>
        <button
          type="button"
          className="nav__burger"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  )
}
