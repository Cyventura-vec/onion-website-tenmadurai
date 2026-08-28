import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Lock, Unlock, Server } from 'lucide-react'

export default function Admin() {
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('checking') // checking, denied, granted

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch('/admin.php', { redirect: 'manual' })
        
        // If it redirects to login or returns non-200 or returns HTML instead of our expected text
        if (response.type === 'opaqueredirect' || !response.ok) {
          setStatus('denied')
          return
        }
        
        const text = await response.text()
        
        if (text.includes('PROJECT AAZHI – RESTRICTED ARCHIVE') || text.includes('PROJECT KUMARI – RESTRICTED ARCHIVE')) {
          setContent(text)
          setStatus('granted')
        } else {
          setStatus('denied')
        }
      } catch (err) {
        setStatus('denied')
      }
    }
    
    checkAccess()
  }, [])

  if (status === 'checking') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-2 border-red-900 border-t-red-500 rounded-full animate-spin mb-6"></div>
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
      {/* Security scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
      
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
      </div>
    </div>
  )
}
