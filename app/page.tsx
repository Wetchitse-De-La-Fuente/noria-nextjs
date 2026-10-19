import {
  ExperienceProvider,
  SiteHeader,
  DemoWorkbench,
  TimeSimulator,
  FAQ,
  ContactDialog,
  DetailDialog,
  Motion,
} from '@/components/experience';
import {
  AccueilSection,
  SolutionsSection,
  ExpertisesSection,
  MethodeSection,
  ImpactSection,
  ContactSection,
} from '@/components/site-sections';
export default function Page() {
  return (
    <ExperienceProvider>
      <svg className="icon-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M4 12h15M13 5l7 7-7 7"></path>
        </symbol>
        <symbol id="i-up-right" viewBox="0 0 24 24">
          <path d="M5 19 19 5M5 5h14v14"></path>
        </symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24">
          <path d="m9 5 7 7-7 7"></path>
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"></path>
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6"></path>
        </symbol>
        <symbol id="i-doc" viewBox="0 0 24 24">
          <path d="M14 3H5v18h14V8l-5-5Z"></path>
          <path d="M14 3v5h5M8 12h8M8 16h6"></path>
        </symbol>
        <symbol id="i-compass" viewBox="0 0 32 32">
          <path d="M3 16h6m14 0h6M16 3v6m0 14v6"></path>
          <path d="m22 10-4 8-8 4 4-8 8-4Z"></path>
          <path d="M6 6h20v20H6z" opacity=".25"></path>
        </symbol>
        <symbol id="i-flow" viewBox="0 0 32 32">
          <path d="M3 4h9v9H3zM20 19h9v9h-9zM20 4h9v9h-9zM12 8h8M8 13v11h12"></path>
        </symbol>
        <symbol id="i-learn" viewBox="0 0 32 32">
          <path d="m2 11 14-7 14 7-14 7-14-7ZM7 14v10l9 4 9-4V14M30 11v13"></path>
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <path d="M3 5h18v14H3zM3 5l9 8 9-8"></path>
        </symbol>
        <symbol id="i-copy" viewBox="0 0 24 24">
          <path d="M8 8h12v13H8zM16 8V3H3v13h5"></path>
        </symbol>
        <symbol id="i-download" viewBox="0 0 24 24">
          <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"></path>
        </symbol>
      </svg>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <div className="page-progress" aria-hidden="true"></div>
      <SiteHeader />
      <main id="main">
        <AccueilSection />
        <SolutionsSection />
        <ExpertisesSection />
        <MethodeSection />
        <ImpactSection />
        <FAQ />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="shell">
          <div className="footer-main">
            <a className="brand" href="#accueil" aria-label="Noria — Accueil">
              <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M3 25V7l13 18V7l13 18V7"></path>
              </svg>
              <span>
                noria<span className="brand-dot">.</span>
              </span>
            </a>
            <p>
              L’intelligence artificielle.
              <br />
              Dans le bon sens.
            </p>
            <nav aria-label="Navigation de pied de page">
              <a href="#expertises">Expertises</a>
              <a href="#solutions">Cas d’usage</a>
              <a href="#methode">Notre méthode</a>
              <a href="#contact">Votre projet</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              © <span id="year">2026</span> Noria · Conseil en IA
            </span>
            <span>De l’humain. Des idées. De l’impact.</span>
            <button className="footer-legal" id="privacy-open">
              Confidentialité
            </button>
          </div>
        </div>
      </footer>
      <ContactDialog />
      <DetailDialog />
      <noscript>
        <div className="noscript-note">
          Les contenus sont accessibles sans JavaScript. Activez-le pour essayer les démonstrations, le
          simulateur et préparer votre brief.
        </div>
      </noscript>
      <Motion />
    </ExperienceProvider>
  );
}
