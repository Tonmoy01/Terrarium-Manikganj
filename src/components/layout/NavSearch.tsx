import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { SearchIcon } from '../ui/Icons'

export function NavSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form
      className={`nav__search${isOpen ? ' nav__search--open' : ''}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="visually-hidden" htmlFor="nav-search">Search terrariums</label>
      <input
        ref={inputRef}
        id="nav-search"
        name="search"
        type="search"
        placeholder="Search"
        tabIndex={isOpen ? 0 : -1}
        onBlur={(event) => !event.currentTarget.value && setIsOpen(false)}
      />
      <button
        type={isOpen ? 'submit' : 'button'}
        className="nav__icon"
        aria-label={isOpen ? 'Search' : 'Open search'}
        aria-expanded={isOpen}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        <SearchIcon />
      </button>
    </form>
  )
}
