import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const fallbackDocuments = {
  'docs/public/about.txt': `Project AAZHI is an ongoing research initiative studying the historical and mythological record of Kumari Kandam, the lost southern landmass referenced in ancient Tamil literature. This portal serves as a public-facing interface to the project's digitized archive.

Access to restricted sections requires authentication.`,

  'docs/tenmadurai/01_tenmadurai_fall.txt': `Tenmadurai was once regarded as the intellectual heart of the kingdom—a city where scholars, poets, philosophers, astronomers, and historians gathered beneath the protection of the royal court. Its great library was more than a collection of books; it was a living institution where knowledge was preserved, debated, and passed from one generation to the next.

But under King Vetrivel, the relationship between the throne and the scholars began to deteriorate.

Vetrivel increasingly viewed the scholars' counsel as an inconvenience rather than a necessity. Their warnings about the kingdom's finances, education, and long-term stability were repeatedly dismissed in favor of advice that promised immediate prestige and luxury. What had once been invested in schools, manuscripts, observatories, and public learning was gradually redirected toward foreign luxuries and extravagant displays at court.

The scholars protested.

They presented reports, petitions, and historical records warning that a kingdom that abandoned knowledge would eventually lose the ability to govern itself. Yet their voices carried little weight within Vetrivel's court. Some scholars were removed from their positions, while others quietly left Tenmadurai in search of patrons who valued their work.

With fewer scholars remaining, the great library slowly fell silent.

Its halls, once filled with debates and lectures, became deserted. New manuscripts stopped arriving. Ancient works were left without caretakers, and generations of accumulated knowledge were no longer being studied or copied. The library still stood as an impressive monument, but behind its doors, the intellectual life of Tenmadurai was fading.

Within a decade, the city had changed dramatically.

Tenmadurai was no longer known as the kingdom's center of learning. Its scholars had scattered, its institutions had weakened, and its once-great library stood almost empty. The transformation became a warning remembered by later generations:

A kingdom does not lose its knowledge in a single day. It loses it whenever those who possess it are no longer heard.

And so the fall of Tenmadurai began—not with an invasion or a battle, but with a king who stopped listening.`,

  'docs/tenmadurai/02_street_academy.txt': `When the royal academies of Tenmadurai lost their funding, the scholars did not abandon their pursuit of knowledge. Deprived of lecture halls, royal grants, and official recognition, they carried their teachings beyond the walls of the institutions that had once supported them.

The streets became their classrooms.

Under shaded marketplaces, beside temple courtyards, near busy wells, and beneath the trees that lined the city's roads, scholars began gathering small groups of students. They taught wherever there was enough space to sit and enough light to read. There were no formal admissions, no expensive fees, and no royal invitations. Anyone willing to listen was welcome.

Children came first, carrying scraps of parchment and charcoal tablets. Farmers arrived after working their fields, eager to understand the mathematics needed for trade and measurement. Merchants sought lessons in accounting, astronomy, languages, and navigation. Even craftsmen and laborers began attending whenever their work allowed.

The lessons were simple, but the knowledge was not.

Scholars taught mathematics, medicine, astronomy, philosophy, history, literature, and the sciences known to their age. Old manuscripts were copied by hand and passed from teacher to student. A single surviving book could be read aloud to an entire gathering before being carefully carried to another street academy.

These gatherings became known as the Street Academies.

At first, the royal court considered them insignificant. Without official buildings or government support, they appeared incapable of replacing the institutions that had been dismantled. But the scholars understood something the court had overlooked:

Knowledge did not belong to the palace. It belonged to those willing to preserve it.

The Street Academies gradually spread throughout Tenmadurai. One teacher inspired another. A student became an apprentice, an apprentice became a teacher, and lessons that might have disappeared with the royal academies continued from one generation to the next.

The movement was never wealthy. Many teachers survived through donations from merchants, farmers, craftsmen, and ordinary families. Some taught in exchange for food. Others copied manuscripts late into the night after their lessons had ended.

Yet they continued.

What began as an act of necessity became an act of defiance—not against a single king, but against the belief that learning could be controlled by the throne.

Years later, historians would recognize the Street Academies as one of Tenmadurai's greatest acts of preservation. The royal academies had been built with stone and royal money. The Street Academies survived on something far more difficult to destroy:

Conviction.

The kingdom had taken away their classrooms.

The scholars simply moved the classroom to the streets.`,

  'docs/tenmadurai/03_public_apathy.txt': `The Street Academies had preserved the flame of learning, but preservation alone could not guarantee that anyone would come to listen.

As the years passed, Tenmadurai's people became increasingly fascinated by the wealth and spectacle flowing into the kingdom. Foreign fabrics filled the markets. Imported ornaments appeared in the homes of merchants. Exotic goods, elaborate celebrations, and displays of royal extravagance became symbols of prosperity.

Knowledge, by comparison, seemed ordinary.

The scholars continued to gather in the streets, laying out their manuscripts and preparing their lessons as they had always done. But the crowds that once gathered around them grew smaller. Many preferred the noise of the marketplaces and the excitement of public celebrations to the quiet discipline of study.

The change was gradual.

Parents who once encouraged their children to attend lessons began sending them to work in profitable trades. Merchants saw little immediate value in spending hours listening to philosophers and historians. Younger citizens were increasingly drawn toward entertainment and the promise of material wealth.

The scholars watched their audience disappear.

Only a small group remained faithful to the academies. The poor came because learning was one of the few opportunities still available to them. The elderly came because they remembered a time when scholarship had been respected by the kingdom. They sat beside the teachers, listening carefully while the rest of the city moved around them.

Their numbers were small, but the scholars continued.

They taught mathematics to children who had never entered a formal academy. They recited history to those willing to remember it. They explained the movement of stars to anyone who stopped long enough to look upward. They preserved manuscripts even when almost nobody asked to read them.

There were days when a scholar would prepare an entire lesson for only a handful of students.

Still, the lesson was given.

There were evenings when nobody arrived at all.

Still, the manuscripts were opened.

The scholars understood that their work might not be appreciated in their own time. They were no longer teaching because the kingdom rewarded them. They were teaching because they believed knowledge was worth preserving even when society had stopped valuing it.

The contrast became one of the defining images of late Tenmadurai: crowded marketplaces surrounding nearly empty classrooms.

The kingdom had not destroyed its scholars.

It had simply stopped listening to them.

And the scholars, despite being ignored, refused to stop speaking.`,

  'docs/tenmadurai/04_consequences.txt': `No new generation of scholars arose to replace the old. Oral traditions frayed and were lost within two generations. The city did not fall to war or disaster — it simply forgot itself, and its knowledge perished with the last who remembered it.`,

  'docs/tenmadurai/01_mythological_overview.txt': `According to court record fragments recovered from the Tenmadurai excavation, the sage Agastya founded the city on the southern shore during the second Sangam era. The wanderer's last known words, preserved in oral tradition, were: "I am leaving for Kapatapuram tomorrow." Kabilan's final transmission from the survey team was dated 2027-09-23, three days before contact was lost.`,

  'docs/tenmadurai/02_serpent_mother_legend.txt': `Temple inscriptions describe a guardian figure — the Serpent Mother — said to protect the city's central library from those unworthy of its knowledge. Scholars generally read this as an allegory for restricted access to priesthood-only texts rather than a literal creature, though the inscriptions themselves make no such distinction.`,

  'docs/tenmadurai/03_golden_peacock_incident.txt': `Palace chronicles record that King Vetrivel pursued a golden peacock into the eastern forest on the 23rd day of September, an incident later cited as the beginning of his estrangement from court duties. He did not return for eleven days, and the throne was administered by regents in his absence.`,

  'docs/tenmadurai/04_aazhiyaan_decoder.txt': `Aazhiyaan, credited with decoding the city's numeral system, vanished on the 23rd day of the 9th month, 2027, during a routine survey. His final transmission, sent that morning, contained only a partial cipher key and the coordinates of the southern archive vault.`,

  'docs/tenmadurai/05_curse_of_greed.txt': `The final chronicle entry, dated shortly after the golden peacock incident, records a proclamation attributed to the city's high priest: "Let greed consume what wisdom built" — spoken on the 23rd day of the 9th month. Within a generation the city was abandoned. Later excavation teams found no evidence of war, fire, or natural disaster. The record simply stops.

This concludes the recovered Tenmadurai archive. No further transmissions from the site have been received.`
}

export default function DocumentViewer() {
  const { category, filename } = useParams()
  const navigate = useNavigate()
  
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true)
      setError(null)
      const docPath = `docs/${category}/${filename}`

      try {
        // Try fetching via PHP backend LFI parameter or static public file
        const response = await fetch(`/?page=${docPath}`)
        if (response.ok) {
          const text = await response.text()
          const trimmed = text.trim()
          // Check that the returned text is actual document content and not HTML fallback from Vite dev server
          if (trimmed && !trimmed.startsWith('<!') && !trimmed.startsWith('<html')) {
            setContent(text)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        // Fallback to static map below
      }

      // If network response returned HTML or failed, check fallback dictionary
      if (fallbackDocuments[docPath]) {
        setContent(fallbackDocuments[docPath])
        setError(null)
      } else {
        setError('Document not found in archive.')
      }
      setLoading(false)
    }
    
    fetchDocument()
  }, [category, filename])

  // Simple reading time estimator
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-kumari-stone hover:text-kumari-gold transition-colors mb-10 font-mono text-xs tracking-wider"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        RETURN TO ARCHIVE
      </button>

      <div className="kumari-card p-8 md:p-12 relative">
        {/* Archival metadata header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-kumari-bronze/20 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-kumari-parchment tracking-wide mb-2">
              {filename.replace('.txt', '').replace(/_/g, ' ').toUpperCase()}
            </h1>
            <div className="flex items-center text-kumari-stone font-mono text-xs space-x-4">
              <span className="flex items-center"><FileText className="w-3 h-3 mr-1" /> RECORD ID: {Math.floor(Math.random() * 90000) + 10000}</span>
              <span className="text-kumari-bronze/40">|</span>
              <span className="uppercase">{category} COLLECTION</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 font-mono text-xs text-kumari-stone bg-black/20 p-3 rounded border border-white/5">
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> ARCHIVED: 2027</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-2" /> READ TIME: {readingTime} MIN</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-kumari-bronze border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="font-mono text-xs tracking-widest text-kumari-stone">RETRIEVING RECORD...</span>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-red-900/50 p-4 border border-red-900/30 rounded bg-red-900/10 mb-4">
                <span className="font-mono text-sm tracking-widest text-red-500">ERROR: {error}</span>
              </div>
              <p className="font-sans text-kumari-stone max-w-md">
                The requested document could not be retrieved from the archive.
              </p>
            </div>
          )}
          
          {!loading && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-lg leading-relaxed text-kumari-parchment/90 space-y-4 whitespace-pre-wrap"
            >
              {content}
            </motion.div>
          )}
        </div>
        
        {/* Footer stamps */}
        <div className="mt-16 pt-8 border-t border-kumari-bronze/20 flex justify-between items-center opacity-40">
          <span className="font-mono text-[10px] tracking-widest text-kumari-stone">PROJECT AAZHI DIGITAL ARCHIVE</span>
          <span className="font-mono text-[10px] tracking-widest text-kumari-stone">PUBLIC COLLECTION</span>
        </div>
      </div>
    </div>
  )
}
