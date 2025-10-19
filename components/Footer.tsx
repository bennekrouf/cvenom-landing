import { Translations } from '../lib/types';

export default function Footer({ t }: { t: Translations }) {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="grid-footer">
          <div>
            <h3 className="footer-title">{t.footer.product}</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="footer-link">{t.footer.features}</a></li>
              <li><a href="https://studio.cvenom.com" className="footer-link">{t.footer.studio}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">{t.footer.company}</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="footer-link">{t.footer.about}</a></li>
              <li><a href="/blog" className="footer-link">{t.footer.blog}</a></li>
              <li><a href="/contact" className="footer-link">{t.footer.contact}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="footer-link">{t.footer.privacy}</a></li>
              <li><a href="/terms" className="footer-link">{t.footer.terms}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Cvenom</h3>
            <p className="text-gray-400">cvenom.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Cvenom. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
