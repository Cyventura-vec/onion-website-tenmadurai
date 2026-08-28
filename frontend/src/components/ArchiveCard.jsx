import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'

export default function ArchiveCard({ title, category, description, link }) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(205,164,52,0.15)' }}
      className="kumari-card p-6 flex flex-col h-full group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-kumari-bronze/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
      
      <div className="flex items-center mb-4 text-kumari-bronze">
        <FileText className="w-5 h-5 mr-2 opacity-70" />
        <span className="font-mono text-xs tracking-[0.2em]">{category}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-kumari-parchment group-hover:text-kumari-gold transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-kumari-stone font-sans text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-kumari-bronze/10 flex items-center justify-between">
        <span className="font-mono text-xs text-kumari-stone group-hover:text-kumari-bronze transition-colors">ACCESS RECORD</span>
        <ArrowRight className="w-4 h-4 text-kumari-bronze transform group-hover:translate-x-1 transition-transform" />
      </div>
      
      <Link to={link} className="absolute inset-0 z-10">
        <span className="sr-only">View {title}</span>
      </Link>
    </motion.div>
  )
}
