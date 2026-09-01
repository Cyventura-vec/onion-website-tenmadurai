import { Link } from 'react-router-dom'
import { Menu, X, Database } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-kumari-dark/90 backdrop-blur-md border-b border-kumari-bronze/20 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-kumari-parchment">PROJECT AAZHI</span>
              <span className="font-mono text-xs tracking-widest text-kumari-stone">RESEARCH ARCHIVE</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-kumari-stone hover:text-kumari-gold transition-colors duration-200 font-mono text-sm tracking-wide">Archive</Link>
              <Link to="/about" className="text-kumari-stone hover:text-kumari-gold transition-colors duration-200 font-mono text-sm tracking-wide">Research</Link>
              <Link to="/contact" className="text-kumari-stone hover:text-kumari-gold transition-colors duration-200 font-mono text-sm tracking-wide">Contact</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-kumari-bronze opacity-80 border border-kumari-bronze/30 px-3 py-1 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-kumari-bronze animate-pulse"></div>
            <span>ARCHIVE ONLINE</span>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-kumari-parchment hover:text-kumari-gold p-2 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-kumari-dark/95 backdrop-blur-xl border-b border-kumari-bronze/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-kumari-stone hover:text-kumari-gold block px-3 py-2 font-mono text-sm tracking-wide border-l-2 border-transparent hover:border-kumari-gold transition-all" onClick={() => setIsOpen(false)}>Archive</Link>
              <Link to="/about" className="text-kumari-stone hover:text-kumari-gold block px-3 py-2 font-mono text-sm tracking-wide border-l-2 border-transparent hover:border-kumari-gold transition-all" onClick={() => setIsOpen(false)}>Research</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
