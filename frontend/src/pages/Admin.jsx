import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Lock, Unlock, Server, Users, Mail, Clock, Globe, ChevronDown, ChevronUp, Inbox } from 'lucide-react'

function formatDate(raw) {
  if (!raw) return '—'
  const d = new Date(raw.replace(' ', 'T'))
  return isNaN(d) ? raw : d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
}

function maskEmail(email) {
  if (!email || !email.includes('@')) return email || '—'
  const [user, domain] = email.split('@')
  return user.slice(0, 2) + '***@' + domain
}

function ContactCard({ entry, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border border-kumari-bronze/20 bg-black/30 rounded-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-kumari-bronze/5 transition-colors group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 text-left">
          <div className="shrink-0 w-9 h-9 rounded-full bg-kumari-bronze/10 border border-kumari-bronze/30 flex items-center justify-center font-mono text-xs text-kumari-bronze uppercase">
            {(entry.name?.[0] || '?')}
          </div>
          <div>
            <p className="font-serif text-kumari-parchment text-sm leading-snug">{entry.name || 'Anonymous'}</p>
            <p className="font-mono text-[11px] text-kumari-stone mt-0.5">{maskEmail(entry.email)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-kumari-stone/70">
            <Clock className="w-3 h-3" />
            {formatDate(entry.timestamp)}
          </div>
          {open
            ? <ChevronUp className="w-4 h-4 text-kumari-bronze/60 group-hover:text-kumari-gold transition-colors" />
            : <ChevronDown className="w-4 h-4 text-kumari-bronze/60 group-hover:text-kumari-gold transition-colors" />
          }
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="msg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-kumari-bronze/10 space-y-3">
              <div className="flex flex-wrap gap-4 font-mono text-[11px] text-kumari-stone/70">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> {entry.email || '—'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> {entry.ip || '—'}
                </span>
                <span className="flex items-center gap-1.5 sm:hidden">
                  <Clock className="w-3 h-3" /> {formatDate(entry.timestamp)}
                </span>
              </div>
              <div className="bg-black/40 border border-kumari-bronze/10 rounded-sm px-4 py-3">
                <p className="font-mono text-xs text-kumari-parchment/80 whitespace-pre-wrap leading-relaxed">
                  {entry.message || '(no message)'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ContactsPanel() {
  const [contacts, setContacts] = useState(null) // null = loading
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetch('/admin.php?action=contacts', { redirect: 'manual' })
      .then(r => {
        if (!r.ok && r.type !== 'opaqueredirect') throw new Error('fetch failed')
        return r.json()
      })
      .then(data => setContacts(Array.isArray(data) ? data.slice().reverse() : []))
      .catch(() => setError('Unable to load contact log.'))
  }, [])

  return (
    <section className="mt-14">
      <div className="flex items-center gap-4 mb-6 border-b border-kumari-bronze/20 pb-4">
        <div className="w-10 h-10 rounded-full bg-kumari-bronze/10 border border-kumari-bronze/30 flex items-center justify-center">
          <Users className="w-5 h-5 text-kumari-bronze" />
        </div>
        <div>
          <h2 className="text-lg font-serif text-kumari-gold tracking-widest">CONTACT SUBMISSIONS</h2>
          <p className="font-mono text-[11px] text-kumari-stone mt-0.5 tracking-widest">
            PEOPLE WHO REACHED OUT TO THE ARCHIVE
          </p>
        </div>

        {contacts !== null && (
          <span className="ml-auto font-mono text-xs bg-kumari-bronze/10 border border-kumari-bronze/30 text-kumari-bronze px-3 py-1 rounded-full">
            {contacts.length} {contacts.length === 1 ? 'entry' : 'entries'}
          </span>
        )}
      </div>

      <div className="flex items-start gap-3 bg-amber-950/20 border border-amber-700/30 rounded-sm px-4 py-3 mb-6">
        <Inbox className="w-4 h-4 text-amber-400/80 mt-0.5 shrink-0" />
        <p className="font-mono text-xs text-amber-200/70 leading-relaxed">
          NOTE — The following individuals have submitted contact forms and have therefore been
          logged as persons of interest to the Project Aazhi research network.
          All submissions are stored server-side and visible to authorised admins only.
        </p>
      </div>

      {error && (
        <div className="font-mono text-xs text-red-400/70 p-4 border border-red-900/30 bg-red-950/20 rounded">
          {error}
        </div>
      )}

      {contacts === null && !error && (
        <div className="flex items-center gap-3 text-kumari-stone font-mono text-xs py-6">
          <div className="w-4 h-4 border border-kumari-bronze/40 border-t-kumari-gold rounded-full animate-spin" />
          LOADING CONTACT LOG…
        </div>
      )}

      {contacts !== null && contacts.length === 0 && (
        <div className="text-center py-10 border border-kumari-bronze/10 bg-black/20 rounded-sm">
          <Users className="w-10 h-10 text-kumari-bronze/20 mx-auto mb-3" />
          <p className="font-mono text-xs text-kumari-stone/60 tracking-widest">NO CONTACT SUBMISSIONS YET</p>
        </div>
      )}

      {contacts !== null && contacts.length > 0 && (
        <div className="space-y-3">
          {contacts.map((entry, i) => (
            <ContactCard key={i} entry={entry} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

export default function Admin() {
  const [content, setContent] = useState('')
  const [status, setStatus]   = useState('checking') // checking | denied | granted

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch('/admin.php', { redirect: 'manual' })

        if (response.type === 'opaqueredirect' || !response.ok) {
          setStatus('denied')
          return
        }

        const text = await response.text()

        if (
          text.includes('PROJECT AAZHI – RESTRICTED ARCHIVE') ||
          text.includes('PROJECT KUMARI – RESTRICTED ARCHIVE')
        ) {
          setContent(text)
          setStatus('granted')
        } else {
          setStatus('denied')
        }
      } catch {
        setStatus('denied')
      }
    }

    checkAccess()
  }, [])

  if (status === 'checking') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-2 border-red-900 border-t-red-500 rounded-full animate-spin mb-6" />
        <p className="font-mono text-sm tracking-widest text-red-500/80 animate-pulse">VERIFYING CREDENTIALS...</p>
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#050505] p-4 text-center">
        <ShieldAlert className="w-16 h-16 text-red-600 mb-6" />
        <h1 className="text-2xl font-serif tracking-widest text-red-500 mb-4">RESTRICTED ARCHIVE</h1>
        <p className="font-mono text-sm text-red-400/80 mb-8 max-w-md">
          ACCESS DENIED. AUTHORIZED RESEARCH PERSONNEL ONLY.
          ALL ACCESS ATTEMPTS ARE LOGGED.
        </p>
        <div className="font-mono text-xs text-red-900/60 p-4 border border-red-900/30 bg-red-950/20 rounded">
          ERR_UNAUTHORIZED_SESSION
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020202] text-red-50 py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

      <div className="max-w-5xl mx-auto relative z-20">
        <header className="border-b border-red-900/50 pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-serif text-red-500 tracking-widest mb-2 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-red-600" />
              RESTRICTED ARCHIVE
            </h1>
            <p className="font-mono text-xs text-red-400/70 tracking-widest">PROJECT AAZHI CLASSIFIED RECORDS</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="flex items-center space-x-2 text-green-500 font-mono text-xs mb-1 bg-green-950/30 px-3 py-1 rounded border border-green-900/50">
              <Unlock className="w-3 h-3" />
              <span>ACCESS STATUS: AUTHORIZED RESEARCHER</span>
            </div>
            <div className="flex items-center space-x-2 text-red-400/60 font-mono text-[10px]">
              <Server className="w-3 h-3" />
              <span>SECURE CONNECTION ESTABLISHED</span>
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 border border-red-900/30 rounded p-6 shadow-[0_0_30px_rgba(220,38,38,0.05)]"
        >
          <pre className="font-mono text-sm text-red-200/90 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {content}
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ContactsPanel />
        </motion.div>
      </div>
    </div>
  )
}
