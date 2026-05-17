import { Translations } from "../../lib/types";

interface FooterProps {
  t: Translations;
  lang: 'en' | 'fr';
}

export default function Footer({ t, lang }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="grid-footer">
          <div>
            <h3 className="footer-title">{t.footer.product}</h3>
            <ul className="space-y-2">
              <li><a href={`/${lang}/#features`} className="footer-link">{t.footer.features}</a></li>
              <li><a href="https://studio.cvenom.com" className="footer-link">{t.footer.studio}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">{t.footer.company}</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="footer-link">{t.footer.about}</a></li>
              <li><a href={`/${lang}/blog`} className="footer-link">{t.footer.blog}</a></li>
              <li><a href={`/${lang}/contact`} className="footer-link">{t.footer.contact}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li><a href={`/${lang}/privacy`} className="footer-link">{t.footer.privacy}</a></li>
              <li><a href={`/${lang}/terms`} className="footer-link">{t.footer.terms}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">{t.footer.earn}</h3>
            <ul className="space-y-2">
              <li><a href="https://studio.cvenom.com/en/bd" className="footer-link">{t.footer.earnLink}</a></li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">cvenom.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Cvenom. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
