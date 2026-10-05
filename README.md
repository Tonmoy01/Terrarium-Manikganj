# Terrarium Manikganj

A cinematic, scroll-driven landing page for handmade terrariums in Manikganj, Bangladesh. Built with React, TypeScript, Tailwind CSS, GSAP, and Vite.

## Project structure

```text
src/
├── components/
│   ├── catalog/       Product components
│   ├── layout/        Site-wide navigation and footer
│   ├── sections/      Landing-page sections
│   └── ui/            Shared presentation components and icons
├── data/              Static site content
├── hooks/             Animation and observer behavior
├── lib/               Frame and canvas-sequence utilities
├── App.tsx            Application composition
├── index.css          Global design system and component styles
└── main.tsx           React entry point
```

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```
