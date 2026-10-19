'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { demos, expertiseDetails, privacyDetail, type DemoKey, type ExpertiseKey } from '@/data/content';
import { createAnimationScope } from '@/lib/animation-scope';
import { initializeMotion } from '@/lib/motion';
type Detail = {
  label: string;
  title: string;
  description: string;
  blocks: readonly (readonly [string, string])[];
  interest?: string;
};
type Experience = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
  detail: Detail | null;
  setDetail: (value: Detail | null) => void;
  interest: string;
  setInterest: (value: string) => void;
  contactSession: number;
};
const Context = createContext<Experience | null>(null);
function useExperience() {
  const value = useContext(Context);
  if (!value) throw new Error('ExperienceProvider manquant');
  return value;
}
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [interest, setInterest] = useState('Stratégie IA');
  const [contactSession, setContactSession] = useState(0);
  const openContact = (open: boolean) => {
    setContactOpen(open);
    if (open) setContactSession((value) => value + 1);
  };
  useEffect(() => {
    const click = (event: globalThis.MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-contact],[data-expertise],#privacy-open')
          : null;
      if (!target) return;
      setMenuOpen(false);
      if (target.hasAttribute('data-contact')) {
        setContactOpen(true);
        setContactSession((value) => value + 1);
      }
      if (target.dataset.expertise) setDetail(expertiseDetails[target.dataset.expertise as ExpertiseKey]);
      if (target.id === 'privacy-open') setDetail(privacyDetail);
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('modal-open', contactOpen || Boolean(detail));
    return () => document.body.classList.remove('modal-open');
  }, [contactOpen, detail]);
  return (
    <Context.Provider
      value={{
        menuOpen,
        setMenuOpen,
        contactOpen,
        setContactOpen: openContact,
        detail,
        setDetail,
        interest,
        setInterest,
        contactSession,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function SiteHeader() {
  const { menuOpen, setMenuOpen } = useExperience();
  useEffect(() => {
    const query = matchMedia('(min-width: 901px)');
    const resize = () => {
      if (query.matches) setMenuOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
      }
    };
    query.addEventListener('change', resize);
    document.addEventListener('keydown', key);
    return () => {
      query.removeEventListener('change', resize);
      document.removeEventListener('keydown', key);
    };
  }, [menuOpen, setMenuOpen]);
  return (
    <header className="site-header">
      <div className="nav-wrap shell">
        <a className="brand" href="#accueil" aria-label="Noria — Accueil">
          {' '}
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M3 25V7l13 18V7l13 18V7"></path>
          </svg>{' '}
          <span>
            noria<span className="brand-dot">.</span>
          </span>{' '}
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href="#expertises">Expertises</a>
          <a href="#solutions">Cas d’usage</a>
          <a href="#methode">Notre méthode</a>
          <a href="#faq">Questions fréquentes</a>
        </nav>
        <button className="nav-contact text-link" data-contact="">
          Parlons de votre projet{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
        <button
          className="menu-toggle"
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Navigation mobile" hidden={!menuOpen}>
        <a href="#expertises" onClick={() => setMenuOpen(false)}>
          Expertises <span>01</span>
        </a>
        <a href="#solutions" onClick={() => setMenuOpen(false)}>
          Cas d’usage <span>02</span>
        </a>
        <a href="#methode" onClick={() => setMenuOpen(false)}>
          Notre méthode <span>03</span>
        </a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>
          Questions fréquentes <span>04</span>
        </a>
        <button className="text-link" data-contact="">
          Parlons de votre projet{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
      </nav>
    </header>
  );
}

/** Les trois démonstrations sont des simulations locales, comme dans l'original. */
export function DemoWorkbench() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>('support');
  const [interacted, setInteracted] = useState(false);
  const [output, setOutput] = useState<string[]>([...demos.support.answer]);
  const [running, setRunning] = useState(false);
  const [pipeline, setPipeline] = useState(0);
  const [status, setStatus] = useState('À vous de jouer');
  const [typingIndex, setTypingIndex] = useState(-1);
  const [runCount, setRunCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const data = demos[activeDemo];
  function selectDemo(key: DemoKey) {
    setActiveDemo(key);
    setInteracted(true);
    setOutput([...demos[key].answer]);
    setRunning(false);
    setRunCount(0);
    setPipeline(0);
    setCompleted(false);
    setStatus('À vous de jouer');
  }
  useEffect(() => {
    if (!runCount) return;
    let cancelled = false;
    let frame = 0;
    const controller = new AbortController();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, ms);
        controller.signal.addEventListener(
          'abort',
          () => {
            clearTimeout(timer);
            resolve();
          },
          { once: true },
        );
      });
    async function run() {
      setRunning(true);
      setPipeline(0);
      setStatus('Lecture de la demande…');
      if (!reduced) await wait(450);
      if (cancelled) return;
      setPipeline(1);
      setStatus('Analyse de la source…');
      if (!reduced) await wait(550);
      if (cancelled) return;
      setPipeline(2);
      setStatus('Préparation de la réponse…');
      if (reduced) setOutput([...data.answer]);
      else {
        setOutput([]);
        for (let index = 0; index < data.answer.length; index++) {
          if (cancelled) return;
          setTypingIndex(index);
          const paragraph = data.answer[index];
          const start = performance.now();
          const duration = Math.min(850, 180 + paragraph.length * 4);
          await new Promise<void>((resolve) => {
            const tick = (now: number) => {
              if (cancelled) {
                resolve();
                return;
              }
              const progress = Math.min(1, (now - start) / duration);
              setOutput((previous) => {
                const next = [...previous];
                next[index] = paragraph.slice(0, Math.ceil(paragraph.length * progress));
                return next;
              });
              if (progress < 1) frame = requestAnimationFrame(tick);
              else resolve();
            };
            frame = requestAnimationFrame(tick);
            controller.signal.addEventListener('abort', () => resolve(), { once: true });
          });
        }
      }
      if (cancelled) return;
      setTypingIndex(-1);
      setRunning(false);
      setCompleted(true);
      setStatus('À relire par votre équipe');
    }
    void run();
    return () => {
      cancelled = true;
      controller.abort();
      cancelAnimationFrame(frame);
    };
  }, [runCount, data]);
  return (
    <>
      <div className="demo-tabs reveal" role="tablist" aria-label="Choisir un cas d’usage">
        <button
          role="tab"
          id="tab-support"
          aria-controls="demo-panel"
          data-demo="support"
          aria-selected={activeDemo === 'support'}
          tabIndex={activeDemo === 'support' ? 0 : -1}
          onClick={() => selectDemo('support')}
          onKeyDown={(event) => {
            const keys: DemoKey[] = ['support', 'documents', 'operations'];
            let destination: number | undefined;
            if (event.key === 'ArrowRight') destination = (0 + 1) % 3;
            if (event.key === 'ArrowLeft') destination = (0 + 2) % 3;
            if (event.key === 'Home') destination = 0;
            if (event.key === 'End') destination = 2;
            if (destination === undefined) return;
            event.preventDefault();
            selectDemo(keys[destination]);
            document.getElementById('tab-' + keys[destination])?.focus();
          }}
        >
          <span>01</span> Support client{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
        <button
          role="tab"
          id="tab-documents"
          aria-controls="demo-panel"
          data-demo="documents"
          aria-selected={activeDemo === 'documents'}
          tabIndex={activeDemo === 'documents' ? 0 : -1}
          onClick={() => selectDemo('documents')}
          onKeyDown={(event) => {
            const keys: DemoKey[] = ['support', 'documents', 'operations'];
            let destination: number | undefined;
            if (event.key === 'ArrowRight') destination = (1 + 1) % 3;
            if (event.key === 'ArrowLeft') destination = (1 + 2) % 3;
            if (event.key === 'Home') destination = 0;
            if (event.key === 'End') destination = 2;
            if (destination === undefined) return;
            event.preventDefault();
            selectDemo(keys[destination]);
            document.getElementById('tab-' + keys[destination])?.focus();
          }}
        >
          <span>02</span> Analyse documentaire{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
        <button
          role="tab"
          id="tab-operations"
          aria-controls="demo-panel"
          data-demo="operations"
          aria-selected={activeDemo === 'operations'}
          tabIndex={activeDemo === 'operations' ? 0 : -1}
          onClick={() => selectDemo('operations')}
          onKeyDown={(event) => {
            const keys: DemoKey[] = ['support', 'documents', 'operations'];
            let destination: number | undefined;
            if (event.key === 'ArrowRight') destination = (2 + 1) % 3;
            if (event.key === 'ArrowLeft') destination = (2 + 2) % 3;
            if (event.key === 'Home') destination = 0;
            if (event.key === 'End') destination = 2;
            if (destination === undefined) return;
            event.preventDefault();
            selectDemo(keys[destination]);
            document.getElementById('tab-' + keys[destination])?.focus();
          }}
        >
          <span>03</span> Opérations{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
      </div>
      <div
        id="demo-panel"
        role="tabpanel"
        aria-labelledby={'tab-' + activeDemo}
        className={'workbench reveal' + (running ? ' is-running' : '')}
      >
        <div className="workbench-bar">
          <span className="workbench-brand">
            <span className="tiny-mark"></span> NORIA / EN PRATIQUE
          </span>
          <span className="demo-label">Démonstration illustrative</span>
        </div>
        <div className="workbench-grid">
          <div className="demo-source">
            <p className="micro-label">LE POINT DE DÉPART</p>
            <h3 id="demo-heading">
              {data.heading[0]}
              <br />
              {data.heading[1]}
            </h3>
            <p id="demo-description">{data.description}</p>
            <div className="source-file">
              <svg className="icon">
                <use href="#i-doc"></use>
              </svg>
              <div>
                <span id="demo-file">{data.file}</span>
                <small id="demo-file-detail">{data.fileDetail}</small>
              </div>
              <span className="file-badge">{data.badge}</span>
            </div>
            <div className="demo-prompt">
              <span className="micro-label">LA DEMANDE</span>
              <p id="demo-question">{data.question}</p>
            </div>
          </div>
          <div className="demo-result">
            <div className="pipeline" aria-label="Étapes de la démonstration">
              <span className={'pipeline-step' + (0 <= pipeline ? ' active' : '')}>
                <span>01</span> Comprendre
              </span>
              <span className="pipeline-connector"></span>
              <span className={'pipeline-step' + (1 <= pipeline ? ' active' : '')}>
                <span>02</span> Analyser
              </span>
              <span className="pipeline-connector"></span>
              <span className={'pipeline-step' + (2 <= pipeline ? ' active' : '')}>
                <span>03</span> Préparer
              </span>
            </div>
            <div className="answer-card">
              <div className="answer-head">
                <span className="answer-monogram">n.</span>
                <span>
                  Une réponse, déjà structurée.<small>Assistant de démonstration</small>
                </span>
                <svg className="icon">
                  <use href="#i-check"></use>
                </svg>
              </div>
              <div
                id="demo-output"
                className="answer-output"
                aria-live="polite"
                aria-atomic="true"
                aria-busy={running}
              >
                {!interacted ? (
                  <>
                    <p>Voici une réponse prête à être relue :</p>
                    <p>
                      À Dakar, les commandes sont livrées sous <strong>24 à 48 heures ouvrées</strong> après
                      confirmation.
                    </p>
                    <p>Un message de suivi est envoyé dès que votre commande est en route.</p>
                  </>
                ) : (
                  output.map((text, index) => (
                    <p key={index} className={running && index === typingIndex ? 'typing-caret' : undefined}>
                      {text}
                    </p>
                  ))
                )}
              </div>
              <div className="answer-citation">
                <svg className="icon">
                  <use href="#i-doc"></use>
                </svg>
                <span id="demo-citation">{data.citation}</span>
                <span>Source fictive</span>
              </div>
            </div>
            <div className="demo-controls">
              <span id="demo-status" role="status">
                <span className="tiny-mark" />
                {status}
              </span>
              <button
                id="run-demo"
                className="button primary small"
                onClick={() => {
                  setInteracted(true);
                  setRunCount((value) => value + 1);
                }}
                disabled={running}
              >
                {running ? 'En cours…' : completed ? 'Relancer l’exemple' : 'Lancer la démo'}{' '}
                <svg className="icon">
                  <use href="#i-arrow" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="workbench-foot">
          <span>
            VOS INFORMATIONS <span>→</span> UNE IA ADAPTÉE <span>→</span> UNE ACTION UTILE
          </span>
          <span>Exemple simulé · Aucun envoi de données</span>
        </div>
      </div>
    </>
  );
}
function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 300);
      current.current = Math.round(from + (target - from) * (1 - Math.pow(1 - progress, 3)));
      setValue(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}
export function TimeSimulator() {
  const [team, setTeam] = useState(10);
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(50);
  const [formulaOpen, setFormulaOpen] = useState(false);
  const annual = useAnimatedNumber(Math.round(((team * hours * rate) / 100) * 52));
  const monthly = useAnimatedNumber(Math.round((((team * hours * rate) / 100) * 52) / 12));
  const format = new Intl.NumberFormat('fr-FR');
  return (
    <>
      <div className="simulator reveal">
        <div className="simulator-controls">
          <div className="range-field">
            <label htmlFor="team-size">
              Personnes dans votre équipe{' '}
              <output id="team-value" htmlFor="team-size">
                {team}
              </output>
            </label>
            <input
              type="range"
              id="team-size"
              min="1"
              max="50"
              value={team}
              onChange={(event) => setTeam(Number(event.target.value))}
              style={{ '--range-progress': ((team - 1) / 49) * 100 + '%' } as React.CSSProperties}
            />
            <div className="range-labels">
              <span>1 personne</span>
              <span>50 personnes</span>
            </div>
          </div>
          <div className="range-field">
            <label htmlFor="weekly-hours">
              Tâches répétitives, par personne / semaine{' '}
              <output id="hours-value" htmlFor="weekly-hours">
                {hours} h
              </output>
            </label>
            <input
              type="range"
              id="weekly-hours"
              min="1"
              max="20"
              value={hours}
              onChange={(event) => setHours(Number(event.target.value))}
              style={{ '--range-progress': ((hours - 1) / 19) * 100 + '%' } as React.CSSProperties}
            />
            <div className="range-labels">
              <span>1 heure</span>
              <span>20 heures</span>
            </div>
          </div>
          <div className="rate-field">
            <p>Part du temps que vous imaginez libérer</p>
            <div className="segmented" role="group" aria-label="Hypothèse de temps libéré">
              <button data-rate="25" onClick={() => setRate(25)} aria-pressed={rate === 25}>
                25 %
              </button>
              <button data-rate="50" onClick={() => setRate(50)} aria-pressed={rate === 50}>
                50 %
              </button>
              <button data-rate="75" onClick={() => setRate(75)} aria-pressed={rate === 75}>
                75 %
              </button>
            </div>
          </div>
        </div>
        <div className="simulator-result" aria-live="polite" aria-atomic="true">
          <p className="micro-label">VOTRE ESTIMATION THÉORIQUE</p>
          <div className="result-number">
            <span id="monthly-result">{format.format(monthly)}</span>
            <span>h / mois</span>
          </div>
          <p>à réinvestir dans ce qui compte.</p>
          <div className="annual-result">
            <span id="annual-result">{format.format(annual)}</span> heures sur une année
          </div>
          <p className="estimate-note">
            Une simulation, pas une promesse. Le gain réel dépend des tâches, des outils et de leur adoption.
          </p>
        </div>
      </div>
      <div className="simulator-footer reveal">
        <button
          id="formula-toggle"
          className="text-link"
          aria-controls="formula"
          aria-expanded={formulaOpen}
          onClick={() => setFormulaOpen(!formulaOpen)}
        >
          Comment est-ce calculé ?{' '}
          <svg className="icon">
            <use href="#i-plus"></use>
          </svg>
        </button>
        <button className="text-link" data-contact="">
          Évaluons votre cas concret{' '}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </button>
      </div>
      <p className="formula" id="formula" hidden={!formulaOpen}>
        Équipe × heures répétitives par semaine × part du temps libéré × 52 semaines ÷ 12 mois. Les résultats
        sont arrondis à l’heure. Cette estimation ne tient pas compte des coûts de mise en place, de contrôle
        ou de maintenance.
      </p>
    </>
  );
}
export function FAQ() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  function toggle(index: number) {
    const opening = !expanded.has(index);
    setExpanded((previous) => {
      const next = new Set(previous);
      if (opening) next.add(index);
      else next.delete(index);
      return next;
    });
    if (opening && !matchMedia('(prefers-reduced-motion: reduce)').matches)
      requestAnimationFrame(() =>
        document.getElementById('faq-' + (index + 1))?.animate(
          [
            { opacity: 0, transform: 'translateY(-6px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 350, easing: 'ease-out' },
        ),
      );
  }
  return (
    <section className="section shell faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-heading reveal">
        <p className="eyebrow">05 — ON VOUS RÉPOND</p>
        <h2 id="faq-title">
          Les bonnes questions.
          <br />
          Pour bien commencer.
        </h2>
        <p>
          Vous en avez une autre ?<br />
          <button className="text-link" data-contact="">
            Préparons votre échange{' '}
            <svg className="icon">
              <use href="#i-up-right"></use>
            </svg>
          </button>
        </p>
      </div>
      <div className="faq-list">
        <article className="faq-item reveal">
          <h3>
            <button aria-controls="faq-1" aria-expanded={expanded.has(0)} onClick={() => toggle(0)}>
              Faut-il déjà avoir une équipe technique ?
              <svg className="icon">
                <use href="#i-plus"></use>
              </svg>
            </button>
          </h3>
          <div className="faq-answer" id="faq-1" hidden={!expanded.has(0)}>
            <p>
              Non. Nous adaptons le projet à vos ressources. Le premier travail consiste à comprendre vos
              besoins et vos outils actuels. Votre équipe métier participe aux choix et aux tests, avec ou
              sans équipe technique interne.
            </p>
          </div>
        </article>
        <article className="faq-item reveal">
          <h3>
            <button aria-controls="faq-2" aria-expanded={expanded.has(1)} onClick={() => toggle(1)}>
              Par quel projet commencer ?
              <svg className="icon">
                <use href="#i-plus"></use>
              </svg>
            </button>
          </h3>
          <div className="faq-answer" id="faq-2" hidden={!expanded.has(1)}>
            <p>
              Un bon premier projet résout un problème précis et fréquent, avec des données accessibles et un
              résultat mesurable. Nous comparons les pistes selon leur utilité, leur faisabilité et l’effort
              nécessaire avant d’en choisir une.
            </p>
          </div>
        </article>
        <article className="faq-item reveal">
          <h3>
            <button aria-controls="faq-3" aria-expanded={expanded.has(2)} onClick={() => toggle(2)}>
              Que deviennent nos données ?
              <svg className="icon">
                <use href="#i-plus"></use>
              </svg>
            </button>
          </h3>
          <div className="faq-answer" id="faq-3" hidden={!expanded.has(2)}>
            <p>
              Le périmètre, les accès et les règles de conservation sont définis pendant le cadrage. Les choix
              d’outils et d’hébergement sont documentés avec vous. Nous identifions les informations sensibles
              avant de connecter une solution à vos données.
            </p>
          </div>
        </article>
        <article className="faq-item reveal">
          <h3>
            <button aria-controls="faq-4" aria-expanded={expanded.has(3)} onClick={() => toggle(3)}>
              Combien coûte un accompagnement ?
              <svg className="icon">
                <use href="#i-plus"></use>
              </svg>
            </button>
          </h3>
          <div className="faq-answer" id="faq-4" hidden={!expanded.has(3)}>
            <p>
              Le budget dépend du périmètre, des intégrations et de l’accompagnement des équipes. Le premier
              échange permet de clarifier votre besoin. Une proposition précise ensuite les livrables, les
              étapes et les coûts d’outils éventuels.
            </p>
          </div>
        </article>
        <article className="faq-item reveal">
          <h3>
            <button aria-controls="faq-5" aria-expanded={expanded.has(4)} onClick={() => toggle(4)}>
              Et après le déploiement ?
              <svg className="icon">
                <use href="#i-plus"></use>
              </svg>
            </button>
          </h3>
          <div className="faq-answer" id="faq-5" hidden={!expanded.has(4)}>
            <p>
              Nous définissons les modalités de suivi dès le départ : formation, documentation, observation
              des usages et points d’amélioration. L’objectif est que votre équipe sache utiliser la solution
              et comprendre quand une validation humaine reste nécessaire.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return ref;
}
function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>, close: () => void) {
  if (event.target !== event.currentTarget) return;
  const b = event.currentTarget.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom)
    close();
}
function downloadText(text: string) {
  const url = URL.createObjectURL(new Blob(['\ufeff' + text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Noria-Brief-Projet-IA.txt';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function ContactDialog() {
  const { contactOpen, setContactOpen, interest, setInterest, contactSession } = useExperience();
  const contactRef = useDialog(contactOpen);
  const [resultVisible, setResultVisible] = useState(false);
  const [brief, setBrief] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    setResultVisible(false);
  }, [contactSession]);
  useEffect(() => {
    if (resultVisible) {
      const title = contactRef.current?.querySelector<HTMLElement>('#contact-success h2');
      title?.setAttribute('tabindex', '-1');
      title?.focus({ preventScroll: true });
      if (contactRef.current) contactRef.current.scrollTop = 0;
    }
  }, [resultVisible, contactRef]);
  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameField = form.elements.namedItem('name') as HTMLInputElement;
    const messageField = form.elements.namedItem('message') as HTMLTextAreaElement;
    nameField.setCustomValidity(nameField.value.trim() ? '' : 'Indiquez votre nom.');
    messageField.setCustomValidity(
      messageField.value.trim().length >= 10 ? '' : 'Décrivez votre besoin en au moins 10 caractères.',
    );
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setBrief(
      [
        'NORIA — BRIEF DE PROJET IA',
        '',
        'Nom : ' + String(data.get('name')).trim(),
        'E-mail : ' + String(data.get('email')).trim(),
        'Entreprise : ' + (String(data.get('company')).trim() || 'Non précisée'),
        'Sujet : ' + interest,
        '',
        'VOTRE BESOIN',
        String(data.get('message')).trim(),
        '',
        'Document préparé localement. Aucun message n’a été envoyé.',
      ].join('\n'),
    );
    setResultVisible(true);
    setCopyStatus('');
  }
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus('Le brief a été copié.');
    } catch {
      setCopyStatus('La copie est indisponible ici. Vous pouvez télécharger le brief.');
    }
  }
  return (
    <dialog
      id="contact-dialog"
      className="modal contact-modal"
      ref={contactRef}
      onClose={() => setContactOpen(false)}
      onClick={(event) => closeOnBackdrop(event, () => setContactOpen(false))}
      aria-labelledby={resultVisible ? 'contact-success-title' : 'contact-modal-title'}
    >
      <button
        className="modal-close"
        data-close=""
        aria-label="Fermer le formulaire"
        onClick={() => setContactOpen(false)}
      >
        <svg className="icon">
          <use href="#i-plus"></use>
        </svg>
      </button>
      <div id="contact-form-view" hidden={resultVisible}>
        <p className="eyebrow">PREMIER CONTACT</p>
        <h2 id={'contact-modal-title'}>
          Tout commence
          <br />
          par votre idée.
        </h2>
        <p className="modal-intro">
          Préparez votre brief. Vous pourrez le copier ou le télécharger pour le partager.
        </p>
        <form
          id="contact-form"
          onSubmit={submitBrief}
          onInput={(event) => {
            const field = event.target;
            if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)
              field.setCustomValidity('');
          }}
        >
          <div className="form-row">
            <label>
              Votre nom
              <input
                name="name"
                autoComplete="name"
                placeholder="Prénom et nom"
                required={true}
                maxLength={100}
              />
            </label>
            <label>
              Votre e-mail
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="vous@entreprise.com"
                required={true}
                maxLength={200}
              />
            </label>
          </div>
          <label>
            Votre entreprise <span className="optional">facultatif</span>
            <input
              name="company"
              autoComplete="organization"
              placeholder="Nom de votre entreprise"
              maxLength={150}
            />
          </label>
          <fieldset>
            <legend>Ce qui vous intéresse</legend>
            <div className="interest-options">
              <button
                type="button"
                data-interest="Stratégie IA"
                onClick={() => setInterest('Stratégie IA')}
                aria-pressed={interest === 'Stratégie IA'}
              >
                Stratégie IA
              </button>
              <button
                type="button"
                data-interest="Automatisation"
                onClick={() => setInterest('Automatisation')}
                aria-pressed={interest === 'Automatisation'}
              >
                Automatisation
              </button>
              <button
                type="button"
                data-interest="Formation"
                onClick={() => setInterest('Formation')}
                aria-pressed={interest === 'Formation'}
              >
                Formation
              </button>
              <button
                type="button"
                data-interest="À définir"
                onClick={() => setInterest('À définir')}
                aria-pressed={interest === 'À définir'}
              >
                À définir
              </button>
            </div>
          </fieldset>
          <label>
            Parlez-nous de votre besoin
            <textarea
              name="message"
              rows={3}
              placeholder="Le problème que vous aimeriez résoudre, votre idée, vos questions…"
              required={true}
              minLength={10}
              maxLength={3000}
            ></textarea>
          </label>
          <p className="form-note">
            Ce formulaire prépare un fichier local. Aucune donnée n’est envoyée ni enregistrée sur un serveur.
          </p>
          <button type="submit" className="button primary">
            Préparer mon brief{' '}
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
          </button>
        </form>
      </div>
      <div id="contact-success" className="contact-success" hidden={!resultVisible}>
        <span className="success-icon">
          <svg className="icon">
            <use href="#i-check"></use>
          </svg>
        </span>
        <p className="eyebrow">LE PREMIER PAS EST FAIT</p>
        <h2 id={'contact-success-title'}>
          Votre brief
          <br />
          est prêt.
        </h2>
        <p>
          Copiez-le ou téléchargez-le pour préparer votre échange. Votre message n’a pas encore été envoyé.
        </p>
        <div className="brief-preview" id="brief-preview">
          {brief}
        </div>
        <div className="button-pair">
          <button className="button primary" id="copy-brief" onClick={copyBrief}>
            Copier le brief{' '}
            <svg className="icon">
              <use href="#i-copy"></use>
            </svg>
          </button>
          <button className="button secondary" id="download-brief" onClick={() => downloadText(brief)}>
            Télécharger{' '}
            <svg className="icon">
              <use href="#i-download"></use>
            </svg>
          </button>
        </div>
        <p id="copy-status" role="status">
          {copyStatus}
        </p>
        <button
          className="text-link"
          id="edit-brief"
          onClick={() => {
            setResultVisible(false);
            requestAnimationFrame(() =>
              contactRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus(),
            );
          }}
        >
          ← Modifier mon brief
        </button>
      </div>
    </dialog>
  );
}
export function DetailDialog() {
  const { detail, setDetail, setInterest, setContactOpen } = useExperience();
  const detailRef = useDialog(Boolean(detail));
  return (
    <dialog
      id="detail-dialog"
      className="modal detail-modal"
      ref={detailRef}
      onClose={() => setDetail(null)}
      onClick={(event) => closeOnBackdrop(event, () => setDetail(null))}
      aria-labelledby={'detail-title'}
    >
      <button className="modal-close" data-close="" aria-label="Fermer" onClick={() => setDetail(null)}>
        <svg className="icon">
          <use href="#i-plus"></use>
        </svg>
      </button>
      <p id="detail-eyebrow" className="eyebrow">
        {detail?.label}
      </p>
      <h2 id="detail-title">{detail?.title}</h2>
      <p id="detail-description" className="modal-intro">
        {detail?.description}
      </p>
      <div id="detail-content">
        {detail?.blocks.map(([heading, text]) => (
          <div className="detail-block" key={heading}>
            <h3>{heading}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="button-pair">
        <button
          className="button primary"
          id="detail-contact"
          hidden={!detail?.interest}
          onClick={() => {
            detailRef.current?.close();
              if (detail?.interest) setInterest(detail.interest);
            setDetail(null);
            setContactOpen(true);
          }}
        >
          Préparer votre projet{' '}
          <svg className="icon">
            <use href="#i-arrow"></use>
          </svg>
        </button>
        <button className="button secondary" data-close="" onClick={() => setDetail(null)}>
          Continuer la visite
        </button>
      </div>
    </dialog>
  );
}
export function Motion() {
  useEffect(() => {
    const scope = createAnimationScope();
    initializeMotion(scope);
    return () => scope.dispose();
  }, []);
  return null;
}
