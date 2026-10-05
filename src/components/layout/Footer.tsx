import { footerColumns } from '../../data/siteContent'

export function Footer() {
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__top">
        <div className="footer__brand">
          <p className="footer__logo">Terrarium <em>Manikganj</em></p>
          <p className="footer__line">
            Planted by hand in Manikganj. Delivered sealed and already living, anywhere in
            Bangladesh — cash on delivery.
          </p>
        </div>

        <nav className="footer__columns" aria-label="Footer navigation">
          {footerColumns.map(({ heading, links }) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link}><a href="#collection">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__base">
        <p>© {new Date().getFullYear()} Terrarium Manikganj</p>
        <ul>
          <li><a href="#collection">Privacy</a></li>
          <li><a href="#collection">Terms</a></li>
          <li><a href="#collection">Instagram</a></li>
        </ul>
      </div>
    </footer>
  )
}
