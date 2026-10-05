import { products } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import { ProductCard } from '../catalog/ProductCard'
import { SectionIndex } from '../ui/SectionIndex'

interface CollectionSectionProps {
  onAddItem: () => void
}

export function CollectionSection({ onAddItem }: CollectionSectionProps) {
  const headerRef = useReveal<HTMLDivElement>()

  return (
    <section
      className="collection"
      data-tone="light"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div ref={headerRef} className="collection__header">
        <SectionIndex>02 — The collection</SectionIndex>
        <h2 id="collection-title" className="collection__title">Choose Your Little World</h2>
        <p className="collection__note">
          Each one planted to mature slowly over years rather than seasons.
        </p>
      </div>

      <div className="collection__grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.name}
            product={product}
            index={index}
            onAdd={onAddItem}
          />
        ))}
      </div>

      <p className="collection__more">
        <a className="button button--quiet button--quiet-light" href="#collection">
          See the whole collection
        </a>
      </p>
    </section>
  )
}
