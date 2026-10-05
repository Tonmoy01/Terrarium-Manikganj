import { useCallback, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { BenefitsSection } from './components/sections/BenefitsSection'
import { ClosingSection } from './components/sections/ClosingSection'
import { CollectionSection } from './components/sections/CollectionSection'
import { CraftSection } from './components/sections/CraftSection'
import { HeroSection } from './components/sections/hero/HeroSection'
import { IntroSection } from './components/sections/IntroSection'

export default function App() {
  const [basketCount, setBasketCount] = useState(0)
  const addBasketItem = useCallback(() => {
    setBasketCount((count) => count + 1)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation basketCount={basketCount} />
      <main id="main">
        <HeroSection />
        <IntroSection />
        <CollectionSection onAddItem={addBasketItem} />
        <CraftSection />
        <BenefitsSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  )
}
