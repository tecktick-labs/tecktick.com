import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { Products } from '../components/Products'
import { Approach } from '../components/Approach'
import { Insights } from '../components/Insights'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function Home() {
  useDocumentMeta()

  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Approach />
      <Insights />
    </>
  )
}
