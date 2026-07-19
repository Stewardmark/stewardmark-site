import { useEffect, useRef, useState } from 'react';
import '../styles/contact-form.css';

interface FormCopy {
  nameLabel: string;
  emailLabel: string;
  orgLabel: string;
  orgOptional: string;
  interestLabel: string;
  interestPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
}

interface Props {
  /** POST endpoint (the Cloudflare Pages Function). */
  endpoint: string;
  /** Public Turnstile site key. */
  siteKey: string;
  /** Options for the "What are you interested in?" select. */
  interests: string[];
  copy: FormCopy;
  privacyNote: string;
  successMessage: string;
  /** Trailing text before the mailto fallback (ends with a colon). */
  errorMessage: string;
  mailtoHref: string;
  email: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
  getResponse: (id?: string) => string | undefined;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Load the Turnstile script once per page, no matter how many forms mount.
let turnstileScript: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScript) return turnstileScript;
  turnstileScript = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(s);
  });
  return turnstileScript;
}

const EMPTY = { name: '', email: '', organization: '', interest: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm(props: Props) {
  const { endpoint, siteKey, interests, copy } = props;
  const [values, setValues] = useState({ ...EMPTY });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [verifyError, setVerifyError] = useState(false);

  const token = useRef('');
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const rendered = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || rendered.current || !widgetEl.current || !window.turnstile) return;
        rendered.current = true;
        widgetId.current = window.turnstile.render(widgetEl.current, {
          sitekey: siteKey,
          // Managed / invisible: the widget only appears if a challenge is
          // actually required, otherwise it solves silently.
          appearance: 'interaction-only',
          callback: (t: string) => {
            token.current = t;
          },
          'error-callback': () => {
            token.current = '';
          },
          'expired-callback': () => {
            token.current = '';
          },
        });
      })
      .catch(() => {
        /* Script blocked: submit will surface a verification error. */
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* already gone */
        }
      }
      rendered.current = false;
    };
  }, [siteKey]);

  function resetTurnstile() {
    token.current = '';
    if (widgetId.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetId.current);
      } catch {
        /* noop */
      }
    }
  }

  function set(field: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: false }));
  }

  function validate(): Record<string, boolean> {
    const e: Record<string, boolean> = {};
    if (!values.name.trim()) e.name = true;
    if (!EMAIL_RE.test(values.email.trim())) e.email = true;
    if (!values.interest) e.interest = true;
    if (!values.message.trim()) e.message = true;
    return e;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setVerifyError(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    let t = token.current;
    if (!t && window.turnstile && widgetId.current) {
      t = window.turnstile.getResponse(widgetId.current) || '';
    }
    if (!t) {
      setStatus('error');
      setVerifyError(true);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, token: t }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (res.ok && data.ok) {
        setStatus('success');
        setValues({ ...EMPTY });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      resetTurnstile();
    }
  }

  const busy = status === 'submitting';
  const cls = (field: string, base: string) =>
    errors[field] ? `${base} ${base}--invalid` : base;

  return (
    <div>
      <div aria-live="polite">
        {status === 'success' && (
          <p className="cform__status">{props.successMessage}</p>
        )}
        {status === 'error' && (
          <p className="cform__status cform__status--error">
            {verifyError
              ? 'Please complete the verification below and try again.'
              : props.errorMessage}{' '}
            {!verifyError && (
              <a href={props.mailtoHref}>{props.email}</a>
            )}
          </p>
        )}
      </div>

      <form className="cform" onSubmit={onSubmit} noValidate>
        <div className="cform__row">
          <div className="cform__field">
            <label className="cform__label" htmlFor="cf-name">
              {copy.nameLabel}
            </label>
            <input
              id="cf-name"
              className={cls('name', 'cform__input')}
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set('name', e.currentTarget.value)}
              disabled={busy}
              required
              aria-invalid={errors.name || undefined}
            />
          </div>
          <div className="cform__field">
            <label className="cform__label" htmlFor="cf-email">
              {copy.emailLabel}
            </label>
            <input
              id="cf-email"
              className={cls('email', 'cform__input')}
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set('email', e.currentTarget.value)}
              disabled={busy}
              required
              aria-invalid={errors.email || undefined}
            />
          </div>
        </div>

        <div className="cform__field">
          <label className="cform__label" htmlFor="cf-org">
            {copy.orgLabel}
            <span className="cform__optional">{copy.orgOptional}</span>
          </label>
          <input
            id="cf-org"
            className="cform__input"
            type="text"
            name="organization"
            autoComplete="organization"
            value={values.organization}
            onChange={(e) => set('organization', e.currentTarget.value)}
            disabled={busy}
          />
        </div>

        <div className="cform__field">
          <label className="cform__label" htmlFor="cf-interest">
            {copy.interestLabel}
          </label>
          <select
            id="cf-interest"
            className={cls('interest', 'cform__select')}
            name="interest"
            value={values.interest}
            onChange={(e) => set('interest', e.currentTarget.value)}
            disabled={busy}
            required
            aria-invalid={errors.interest || undefined}
          >
            <option value="" disabled>
              {copy.interestPlaceholder}
            </option>
            {interests.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="cform__field">
          <label className="cform__label" htmlFor="cf-message">
            {copy.messageLabel}
          </label>
          <textarea
            id="cf-message"
            className={cls('message', 'cform__textarea')}
            name="message"
            placeholder={copy.messagePlaceholder}
            value={values.message}
            onChange={(e) => set('message', e.currentTarget.value)}
            disabled={busy}
            required
            aria-invalid={errors.message || undefined}
          />
        </div>

        <div className="cform__turnstile" ref={widgetEl}></div>

        <div className="cform__actions">
          <button type="submit" className="btn" disabled={busy}>
            {busy ? copy.submittingLabel : copy.submitLabel}
          </button>
          <span className="cform__privacy">{props.privacyNote}</span>
        </div>
      </form>
    </div>
  );
}
