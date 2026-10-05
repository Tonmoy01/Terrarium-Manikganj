import { frameUrl } from '../lib/frames'

export interface NavigationLink {
  label: string
  href: string
}

export interface Product {
  name: string
  price: string
  description: string
  image: string
}

export interface Material {
  name: string
  note: string
}

export interface Benefit {
  title: string
  note: string
}

export interface FooterColumn {
  heading: string
  links: string[]
}

export const navigationLinks: NavigationLink[] = [
  { label: 'Shop', href: '#collection' },
  { label: 'Our Story', href: '#craft' },
  { label: 'Journal', href: '#journal' },
]

export const products: Product[] = [
  {
    name: 'Understory',
    price: '৳2,400',
    description: 'Layered planting · pilea, sheet moss, driftwood',
    image: frameUrl(41),
  },
  {
    name: 'Ravine',
    price: '৳3,200',
    description: 'Stone-led landscape · slate, lichen, trailing vine',
    image: frameUrl(55),
  },
  {
    name: 'Thicket',
    price: '৳3,950',
    description: 'Deep-canopy composition · club moss, pebble bed',
    image: frameUrl(75),
  },
]

export const materials: Material[] = [
  { name: 'Glass', note: 'Hand-blown, annealed slowly so the wall stays optically clear.' },
  { name: 'Stone', note: 'Washed river gravel and slate, laid as drainage and as landscape.' },
  { name: 'Moss', note: 'Cushion and sheet moss, gathered from managed woodland.' },
  { name: 'Life', note: 'Springtails and a closed water cycle. Nothing needs replacing.' },
]

export const benefits: Benefit[] = [
  {
    title: 'A living centerpiece',
    note: 'Something on the table that changes, quietly, without asking anything of you.',
  },
  {
    title: 'Low-maintenance nature',
    note: 'A sealed terrarium makes its own weather. Most go months between waterings.',
  },
  {
    title: 'Designed for small spaces',
    note: 'A shelf, a desk, a windowless corner. It needs less room than a lamp.',
  },
  {
    title: 'A world worth slowing down for',
    note: 'Detail rewards attention. You notice the new growth before you notice the week.',
  },
]

export const footerColumns: FooterColumn[] = [
  { heading: 'Shop', links: ['All terrariums', 'Closed gardens', 'Desk scale', 'Gift cards'] },
  { heading: 'Care', links: ['First 30 days', 'Watering', 'Light & placement', 'Replanting'] },
  { heading: 'Studio', links: ['Our story', 'Journal', 'Stockists', 'Contact'] },
]
