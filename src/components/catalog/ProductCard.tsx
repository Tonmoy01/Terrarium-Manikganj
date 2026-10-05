import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Product } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import { ArrowIcon, BagIcon } from '../ui/Icons'

interface ProductCardProps {
  product: Product
  index: number
  onAdd: () => void
}

export function ProductCard({ product, index, onAdd }: ProductCardProps) {
  const cardRef = useReveal({ threshold: 0.12 })
  const addedTimerRef = useRef<number | null>(null)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => () => {
    if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current)
  }, [])

  function handleAdd() {
    onAdd()
    setIsAdded(true)
    if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current)
    addedTimerRef.current = window.setTimeout(() => setIsAdded(false), 1800)
  }

  return (
    <article
      ref={cardRef}
      className="card"
      style={{ '--reveal-delay': `${(index % 2) * 90}ms` } as CSSProperties}
    >
      <div className="card__media">
        <a href="#collection" className="card__image-link" tabIndex={-1} aria-hidden="true">
          <img
            src={product.image}
            alt={`${product.name} handmade terrarium`}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
          />
        </a>
        <div className="card__actions">
          <button type="button" className="card__action card__action--solid" onClick={handleAdd}>
            <BagIcon /><span>{isAdded ? 'Added' : 'Add to basket'}</span>
          </button>
          <a className="card__action card__action--ghost" href="#craft">
            <ArrowIcon /><span>View</span>
          </a>
        </div>
      </div>
      <div className="card__body">
        <div className="card__line">
          <h3 className="card__name">{product.name}</h3>
          <p className="card__price">{product.price}</p>
        </div>
        <p className="card__descriptor">{product.description}</p>
      </div>
    </article>
  )
}
