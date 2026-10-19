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
export function AccueilSection() {
  return (
    <section className="hero shell" id="accueil" aria-labelledby="hero-title">
      <div className="hero-topline intro-in">
        <span className="eyebrow">
          <span className="status-mark"></span> CONSEIL EN INTELLIGENCE ARTIFICIELLE
        </span>
        <span className="hero-edition">DE L’IDÉE AUX USAGES / 001</span>
      </div>
      <h1 id="hero-title">
        <span className="line-mask">
          <span>L’IA a du potentiel.</span>
        </span>
        <span className="line-mask">
          <span>
            Faites-en <em>votre avantage.</em>
          </span>
        </span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-description intro-in">
          <p>
            Une stratégie claire. Des solutions utiles.
            <br />
            Nous aidons votre entreprise à passer
            <br className="desktop-break" /> de « et si ? » à « c’est en place ».
          </p>
          <div className="button-pair">
            <button className="button primary" data-contact="">
              Construisons votre projet{' '}
              <svg className="icon">
                <use href="#i-up-right"></use>
              </svg>
            </button>
            <a className="button secondary" href="#expertises">
              Explorer nos expertises{' '}
              <svg className="icon">
                <use href="#i-arrow"></use>
              </svg>
            </a>
          </div>
        </div>
        <a className="hero-scroll intro-in" href="#solutions" aria-label="Découvrir les possibilités">
          <span className="scroll-line">
            <span></span>
          </span>
          <span>
            DÉCOUVRIR
            <br />
            LES POSSIBILITÉS
          </span>
          <span className="down-arrow">↓</span>
        </a>
      </div>
      <div className="hero-ledger intro-in">
        <a href="#expertises">
          <span className="ledger-number">01 /</span>
          <span>
            Une direction.<small>Stratégie &amp; conseil</small>
          </span>
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </a>
        <a href="#solutions">
          <span className="ledger-number">02 /</span>
          <span>
            Des solutions.<small>IA &amp; automatisation</small>
          </span>
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </a>
        <a href="#methode">
          <span className="ledger-number">03 /</span>
          <span>
            De l’autonomie.<small>Formation &amp; adoption</small>
          </span>
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </a>
      </div>
    </section>
  );
}
export function SolutionsSection() {
  return (
    <section className="section shell" id="solutions" aria-labelledby="solutions-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">01 — LES POSSIBILITÉS</p>
          <h2 id="solutions-title">
            Moins de tâches.
            <br />
            Plus de possibilités.
          </h2>
        </div>
        <p className="section-intro">
          L’IA devient intéressante quand elle résout un vrai problème. Découvrez à quoi cela peut ressembler
          dans votre quotidien.
        </p>
      </div>
      <DemoWorkbench />
      <p className="section-note reveal">
        Support, documents, opérations : le point de départ change. L’objectif reste le même, rendre le
        travail plus simple.
      </p>
    </section>
  );
}
export function ExpertisesSection() {
  return (
    <section className="section shell" id="expertises" aria-labelledby="expertises-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">02 — NOS EXPERTISES</p>
          <h2 id="expertises-title">
            Le bon accompagnement.
            <br />
            Au bon moment.
          </h2>
        </div>
        <p className="section-intro">
          Du premier diagnostic à l’adoption par vos équipes, nous relions la réflexion à la mise en œuvre.
        </p>
      </div>
      <div className="expertise-grid">
        <article className="expertise-card reveal" style={{ '--delay': '0ms' } as React.CSSProperties}>
          <div className="expertise-top">
            <svg className="expertise-icon">
              <use href="#i-compass"></use>
            </svg>
            <span>01 /</span>
          </div>
          <p className="micro-label">STRATÉGIE &amp; CONSEIL</p>
          <h3>
            Trouver
            <br />
            le bon cap.
          </h3>
          <p>Repérez les usages utiles, évaluez leur faisabilité et fixez vos priorités.</p>
          <ul>
            <li>Diagnostic des usages et des données</li>
            <li>Choix des cas d’usage</li>
            <li>Feuille de route concrète</li>
          </ul>
          <button className="text-link" data-expertise="strategie">
            Parlons stratégie{' '}
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
          </button>
        </article>
        <article className="expertise-card reveal" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <div className="expertise-top">
            <svg className="expertise-icon">
              <use href="#i-flow"></use>
            </svg>
            <span>02 /</span>
          </div>
          <p className="micro-label">SOLUTIONS &amp; AUTOMATISATION</p>
          <h3>
            Construire
            <br />
            ce qui compte.
          </h3>
          <p>Connectez l’intelligence artificielle à vos outils et à vos façons de travailler.</p>
          <ul>
            <li>Assistants et recherche documentaire</li>
            <li>Automatisation des tâches</li>
            <li>Intégration et suivi des usages</li>
          </ul>
          <button className="text-link" data-expertise="solutions">
            Explorons les solutions{' '}
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
          </button>
        </article>
        <article className="expertise-card reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <div className="expertise-top">
            <svg className="expertise-icon">
              <use href="#i-learn"></use>
            </svg>
            <span>03 /</span>
          </div>
          <p className="micro-label">FORMATION &amp; ADOPTION</p>
          <h3>
            Avancer.
            <br />
            En équipe.
          </h3>
          <p>Donnez à vos équipes les repères et la pratique pour utiliser l’IA avec discernement.</p>
          <ul>
            <li>Ateliers adaptés à vos métiers</li>
            <li>Bonnes pratiques et limites</li>
            <li>Accompagnement au changement</li>
          </ul>
          <button className="text-link" data-expertise="formation">
            Faisons grandir vos équipes{' '}
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
          </button>
        </article>
      </div>
    </section>
  );
}
export function MethodeSection() {
  return (
    <section className="section shell method-section" id="methode" aria-labelledby="method-title">
      <div className="method-sticky">
        <p className="eyebrow reveal">03 — UNE MÉTHODE, PAS UN MYSTÈRE</p>
        <h2 className="reveal" id="method-title">
          De votre réalité.
          <br />À vos résultats.
        </h2>
        <p className="method-intro reveal">
          On commence par vous écouter.
          <br />
          On avance avec un cap, des étapes
          <br />
          et des critères de réussite partagés.
        </p>
        <div className="method-counter reveal" aria-hidden="true">
          <span id="method-number">01</span>
          <span>/ 04</span>
          <svg className="icon">
            <use href="#i-arrow"></use>
          </svg>
        </div>
        <div className="method-track" aria-hidden="true">
          <span></span>
        </div>
        <p className="method-caption">UNE ÉTAPE APRÈS L’AUTRE.</p>
      </div>
      <div className="method-steps">
        <article className="method-step is-current" data-step="1">
          <span className="step-index">01</span>
          <div>
            <p className="micro-label">DÉCOUVRIR</p>
            <h3>
              Comprendre avant
              <br />
              de proposer.
            </h3>
            <p>
              Vos équipes, vos contraintes, vos outils. Nous partons de ce qui se passe vraiment dans votre
              entreprise.
            </p>
            <span className="step-deliverable">
              À LA CLÉ <span>Un diagnostic partagé</span>
            </span>
          </div>
        </article>
        <article className="method-step" data-step="2">
          <span className="step-index">02</span>
          <div>
            <p className="micro-label">CADRER</p>
            <h3>
              Choisir un premier
              <br />
              projet utile.
            </h3>
            <p>
              Nous définissons ensemble le périmètre, les données nécessaires et les indicateurs qui
              permettront de juger le résultat.
            </p>
            <span className="step-deliverable">
              À LA CLÉ <span>Un plan d’action priorisé</span>
            </span>
          </div>
        </article>
        <article className="method-step" data-step="3">
          <span className="step-index">03</span>
          <div>
            <p className="micro-label">CONSTRUIRE</p>
            <h3>
              Tester. Ajuster.
              <br />
              Mettre en place.
            </h3>
            <p>
              Un premier prototype confronte l’idée aux usages. Les retours des équipes guident les
              ajustements avant le déploiement.
            </p>
            <span className="step-deliverable">
              À LA CLÉ <span>Une solution testée sur le terrain</span>
            </span>
          </div>
        </article>
        <article className="method-step" data-step="4">
          <span className="step-index">04</span>
          <div>
            <p className="micro-label">TRANSMETTRE</p>
            <h3>
              Faire durer
              <br />
              le changement.
            </h3>
            <p>
              Formation, documentation et suivi : vos équipes comprennent la solution, ses limites et la
              manière de la faire évoluer.
            </p>
            <span className="step-deliverable">
              À LA CLÉ <span>Des équipes prêtes à avancer</span>
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
export function ImpactSection() {
  return (
    <section className="section shell" id="impact" aria-labelledby="impact-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">04 — ET POUR VOUS ?</p>
          <h2 id="impact-title">
            Le temps retrouvé.
            <br />
            Ça se projette.
          </h2>
        </div>
        <p className="section-intro">
          Et si une partie des tâches répétitives prenait moins de place ? Ajustez les hypothèses pour
          explorer un premier ordre de grandeur.
        </p>
      </div>
      <TimeSimulator />
    </section>
  );
}
export function ContactSection() {
  return (
    <section className="contact-section shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-top reveal">
        <span className="eyebrow">
          <span className="status-mark"></span> LE PROCHAIN PAS EST SIMPLE
        </span>
        <a className="text-link" href="#accueil">
          Retour en haut ↑
        </a>
      </div>
      <h2 id="contact-title" className="reveal">
        Les idées, c’est bien.
        <br />
        <span>Leur donner suite, c’est mieux.</span>
      </h2>
      <div className="contact-bottom reveal">
        <p>
          Un besoin précis ou une première intuition ?<br />
          Commençons par mettre les mots dessus.
        </p>
        <div className="button-pair">
          <button className="button primary" data-contact="">
            Parlons de votre projet{' '}
            <svg className="icon">
              <use href="#i-up-right"></use>
            </svg>
          </button>
          <a className="button secondary" href="#solutions">
            Revoir les cas d’usage{' '}
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
