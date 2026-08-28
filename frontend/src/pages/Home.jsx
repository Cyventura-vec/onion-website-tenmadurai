import { motion } from 'framer-motion'
import { Search, BookOpen, Scroll, ChevronRight } from 'lucide-react'
import ArchiveCard from '../components/ArchiveCard'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-kumari-bronze/10">
        {/* Abstract Map Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-kumari-dark"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-kumari-parchment tracking-widest mb-3">
              PROJECT <span className="text-kumari-gold">AAZHI</span>
            </h1>
            
            <p className="font-serif text-2xl md:text-3xl text-kumari-gold tracking-[0.2em] mb-6 italic font-light">
              The Lost Land
            </p>
            
            <p className="font-mono text-kumari-bronze tracking-[0.3em] text-sm md:text-base mb-8 uppercase">
              DIGITAL RESEARCH ARCHIVE &bull; TENMADURAI CHRONICLES
            </p>
            
            <p className="text-kumari-stone text-lg md:text-xl font-sans max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              An ongoing digital archive documenting the historical, archaeological, and cultural records associated with the southern continent of Kumari Kandam and ancient Tenmadurai.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('chronicles-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-kumari-bronze hover:bg-kumari-gold text-kumari-dark font-mono font-bold tracking-wider py-4 px-8 rounded-sm transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Scroll className="w-5 h-5" />
                READ CHRONICLES
              </button>
              
              <Link 
                to="/about"
                className="border border-kumari-bronze/40 hover:border-kumari-gold text-kumari-parchment hover:text-kumari-gold font-mono tracking-wider py-4 px-8 rounded-sm transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                ABOUT PROJECT
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Full Tenmadurai Chronicles Directly on Main Website */}
      <section id="chronicles-section" className="py-20 relative bg-gradient-to-b from-kumari-dark via-kumari-gray/20 to-kumari-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-kumari-bronze tracking-[0.3em] uppercase block mb-2">PRIMARY HISTORICAL RECORD</span>
            <h2 className="text-4xl font-serif tracking-widest text-kumari-gold mb-4">THE TENMADURAI CHRONICLES</h2>
            <div className="w-24 h-px bg-kumari-bronze/40 mx-auto mt-4"></div>
          </div>

          <div className="space-y-12">
            {/* Chapter 01: Tenmadurai */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="kumari-card p-8 sm:p-12 border-kumari-bronze/30 shadow-[0_0_25px_rgba(205,164,52,0.08)]"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-kumari-bronze/20">
                <div className="w-10 h-10 rounded-full bg-kumari-bronze/10 flex items-center justify-center text-kumari-gold font-serif font-bold text-lg">
                  01
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-kumari-parchment tracking-wide">01: Tenmadurai</h3>
                  <span className="font-mono text-xs text-kumari-stone tracking-widest">HISTORICAL RECORD &bull; THE FALL</span>
                </div>
              </div>

              <div className="font-serif text-lg leading-relaxed text-kumari-parchment/90 space-y-6">
                <p>
                  Tenmadurai was once regarded as the intellectual heart of the kingdom—a city where scholars, poets, philosophers, astronomers, and historians gathered beneath the protection of the royal court. Its great library was more than a collection of books; it was a living institution where knowledge was preserved, debated, and passed from one generation to the next.
                </p>

                <p>
                  But under <strong className="text-kumari-gold font-semibold">King Vetrivel</strong>, the relationship between the throne and the scholars began to deteriorate.
                </p>

                <p>
                  Vetrivel increasingly viewed the scholars' counsel as an inconvenience rather than a necessity. Their warnings about the kingdom's finances, education, and long-term stability were repeatedly dismissed in favor of advice that promised immediate prestige and luxury. What had once been invested in schools, manuscripts, observatories, and public learning was gradually redirected toward foreign luxuries and extravagant displays at court.
                </p>

                <p className="font-semibold text-kumari-gold italic border-l-2 border-kumari-bronze/40 pl-4 py-1">
                  The scholars protested.
                </p>

                <p>
                  They presented reports, petitions, and historical records warning that a kingdom that abandoned knowledge would eventually lose the ability to govern itself. Yet their voices carried little weight within Vetrivel's court. Some scholars were removed from their positions, while others quietly left Tenmadurai in search of patrons who valued their work.
                </p>

                <p>
                  With fewer scholars remaining, the great library slowly fell silent.
                </p>

                <p>
                  Its halls, once filled with debates and lectures, became deserted. New manuscripts stopped arriving. Ancient works were left without caretakers, and generations of accumulated knowledge were no longer being studied or copied. The library still stood as an impressive monument, but behind its doors, the intellectual life of Tenmadurai was fading.
                </p>

                <p>
                  Within a decade, the city had changed dramatically.
                </p>

                <p>
                  Tenmadurai was no longer known as the kingdom's center of learning. Its scholars had scattered, its institutions had weakened, and its once-great library stood almost empty. The transformation became a warning remembered by later generations:
                </p>

                <blockquote className="my-8 p-6 bg-black/40 border-l-4 border-kumari-gold text-kumari-parchment font-serif text-xl italic rounded-r-sm">
                  "A kingdom does not lose its knowledge in a single day. It loses it whenever those who possess it are no longer heard."
                </blockquote>

                <p>
                  And so the fall of Tenmadurai began—not with an invasion or a battle, but with a king who stopped listening.
                </p>
              </div>
            </motion.article>

            {/* Chapter 02: The Street Academies */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="kumari-card p-8 sm:p-12 border-kumari-bronze/30 shadow-[0_0_25px_rgba(205,164,52,0.08)]"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-kumari-bronze/20">
                <div className="w-10 h-10 rounded-full bg-kumari-bronze/10 flex items-center justify-center text-kumari-gold font-serif font-bold text-lg">
                  02
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-kumari-parchment tracking-wide">02: The Street Academies</h3>
                  <span className="font-mono text-xs text-kumari-stone tracking-widest">HISTORICAL RECORD &bull; CONVICTION</span>
                </div>
              </div>

              <div className="font-serif text-lg leading-relaxed text-kumari-parchment/90 space-y-6">
                <p>
                  When the royal academies of Tenmadurai lost their funding, the scholars did not abandon their pursuit of knowledge. Deprived of lecture halls, royal grants, and official recognition, they carried their teachings beyond the walls of the institutions that had once supported them.
                </p>

                <p className="font-semibold text-kumari-gold italic border-l-2 border-kumari-bronze/40 pl-4 py-1">
                  The streets became their classrooms.
                </p>

                <p>
                  Under shaded marketplaces, beside temple courtyards, near busy wells, and beneath the trees that lined the city's roads, scholars began gathering small groups of students. They taught wherever there was enough space to sit and enough light to read. There were no formal admissions, no expensive fees, and no royal invitations. Anyone willing to listen was welcome.
                </p>

                <p>
                  Children came first, carrying scraps of parchment and charcoal tablets. Farmers arrived after working their fields, eager to understand the mathematics needed for trade and measurement. Merchants sought lessons in accounting, astronomy, languages, and navigation. Even craftsmen and laborers began attending whenever their work allowed.
                </p>

                <p>
                  The lessons were simple, but the knowledge was not.
                </p>

                <p>
                  Scholars taught mathematics, medicine, astronomy, philosophy, history, literature, and the sciences known to their age. Old manuscripts were copied by hand and passed from teacher to student. A single surviving book could be read aloud to an entire gathering before being carefully carried to another street academy.
                </p>

                <p>
                  These gatherings became known as the <strong className="text-kumari-gold font-semibold">Street Academies</strong>.
                </p>

                <p>
                  At first, the royal court considered them insignificant. Without official buildings or government support, they appeared incapable of replacing the institutions that had been dismantled. But the scholars understood something the court had overlooked:
                </p>

                <blockquote className="my-6 p-5 bg-black/40 border-l-4 border-kumari-gold text-kumari-parchment font-serif text-lg italic rounded-r-sm">
                  "Knowledge did not belong to the palace. It belonged to those willing to preserve it."
                </blockquote>

                <p>
                  The Street Academies gradually spread throughout Tenmadurai. One teacher inspired another. A student became an apprentice, an apprentice became a teacher, and lessons that might have disappeared with the royal academies continued from one generation to the next.
                </p>

                <p>
                  The movement was never wealthy. Many teachers survived through donations from merchants, farmers, craftsmen, and ordinary families. Some taught in exchange for food. Others copied manuscripts late into the night after their lessons had ended.
                </p>

                <p>
                  Yet they continued.
                </p>

                <p>
                  What began as an act of necessity became an act of defiance—not against a single king, but against the belief that learning could be controlled by the throne.
                </p>

                <p>
                  Years later, historians would recognize the Street Academies as one of Tenmadurai's greatest acts of preservation. The royal academies had been built with stone and royal money. The Street Academies survived on something far more difficult to destroy:
                </p>

                <blockquote className="my-6 p-5 bg-black/40 border-l-4 border-kumari-gold text-kumari-parchment font-serif text-xl italic rounded-r-sm font-semibold">
                  "Conviction."
                </blockquote>

                <p>
                  The kingdom had taken away their classrooms. The scholars simply moved the classroom to the streets.
                </p>
              </div>
            </motion.article>

            {/* Chapter 03: Public Apathy */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="kumari-card p-8 sm:p-12 border-kumari-bronze/30 shadow-[0_0_25px_rgba(205,164,52,0.08)]"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-kumari-bronze/20">
                <div className="w-10 h-10 rounded-full bg-kumari-bronze/10 flex items-center justify-center text-kumari-gold font-serif font-bold text-lg">
                  03
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-kumari-parchment tracking-wide">03: Public Apathy</h3>
                  <span className="font-mono text-xs text-kumari-stone tracking-widest">HISTORICAL RECORD &bull; APATHY</span>
                </div>
              </div>

              <div className="font-serif text-lg leading-relaxed text-kumari-parchment/90 space-y-6">
                <p>
                  The Street Academies had preserved the flame of learning, but preservation alone could not guarantee that anyone would come to listen.
                </p>

                <p>
                  As the years passed, Tenmadurai's people became increasingly fascinated by the wealth and spectacle flowing into the kingdom. Foreign fabrics filled the markets. Imported ornaments appeared in the homes of merchants. Exotic goods, elaborate celebrations, and displays of royal extravagance became symbols of prosperity.
                </p>

                <p className="font-semibold text-kumari-gold italic border-l-2 border-kumari-bronze/40 pl-4 py-1">
                  Knowledge, by comparison, seemed ordinary.
                </p>

                <p>
                  The scholars continued to gather in the streets, laying out their manuscripts and preparing their lessons as they had always done. But the crowds that once gathered around them grew smaller. Many preferred the noise of the marketplaces and the excitement of public celebrations to the quiet discipline of study.
                </p>

                <p>
                  The change was gradual. Parents who once encouraged their children to attend lessons began sending them to work in profitable trades. Merchants saw little immediate value in spending hours listening to philosophers and historians. Younger citizens were increasingly drawn toward entertainment and the promise of material wealth.
                </p>

                <p>
                  The scholars watched their audience disappear.
                </p>

                <p>
                  Only a small group remained faithful to the academies. The poor came because learning was one of the few opportunities still available to them. The elderly came because they remembered a time when scholarship had been respected by the kingdom. They sat beside the teachers, listening carefully while the rest of the city moved around them.
                </p>

                <p>
                  Their numbers were small, but the scholars continued. They taught mathematics to children who had never entered a formal academy. They recited history to those willing to remember it. They explained the movement of stars to anyone who stopped long enough to look upward. They preserved manuscripts even when almost nobody asked to read them.
                </p>

                <p>
                  There were days when a scholar would prepare an entire lesson for only a handful of students. <em className="text-kumari-gold">Still, the lesson was given.</em>
                </p>

                <p>
                  There were evenings when nobody arrived at all. <em className="text-kumari-gold">Still, the manuscripts were opened.</em>
                </p>

                <p>
                  The scholars understood that their work might not be appreciated in their own time. They were no longer teaching because the kingdom rewarded them. They were teaching because they believed knowledge was worth preserving even when society had stopped valuing it.
                </p>

                <blockquote className="my-6 p-5 bg-black/40 border-l-4 border-kumari-gold text-kumari-parchment font-serif text-lg italic rounded-r-sm">
                  "The contrast became one of the defining images of late Tenmadurai: crowded marketplaces surrounding nearly empty classrooms."
                </blockquote>

                <p>
                  The kingdom had not destroyed its scholars. It had simply stopped listening to them. And the scholars, despite being ignored, refused to stop speaking.
                </p>
              </div>
            </motion.article>

            {/* Chapter 04: Consequences & Loss */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="kumari-card p-8 sm:p-12 border-kumari-bronze/30 shadow-[0_0_25px_rgba(205,164,52,0.08)]"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-kumari-bronze/20">
                <div className="w-10 h-10 rounded-full bg-kumari-bronze/10 flex items-center justify-center text-kumari-gold font-serif font-bold text-lg">
                  04
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-kumari-parchment tracking-wide">04: Consequences & Loss</h3>
                  <span className="font-mono text-xs text-kumari-stone tracking-widest">HISTORICAL RECORD &bull; CONCLUSION</span>
                </div>
              </div>

              <div className="font-serif text-lg leading-relaxed text-kumari-parchment/90 space-y-6">
                <p>
                  No new generation of scholars arose to replace the old. Oral traditions frayed and were lost within two generations. The city did not fall to war or disaster — it simply forgot itself, and its knowledge perished with the last who remembered it.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-20 relative border-t border-kumari-bronze/10 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif tracking-widest text-kumari-gold mb-4">SEARCH THE ARCHIVE</h2>
          <p className="text-kumari-stone font-sans mb-10">Explore publicly available records from the Project AAZHI research collection.</p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-kumari-stone/50" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-24 py-4 bg-kumari-gray/50 border border-kumari-bronze/20 rounded-sm leading-5 bg-transparent placeholder-kumari-stone/50 text-kumari-parchment focus:outline-none focus:ring-1 focus:ring-kumari-bronze focus:border-kumari-bronze sm:text-sm transition-colors font-mono" 
              placeholder="Search archive records..." 
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <span className="hidden sm:inline-flex items-center px-2 py-1 border border-kumari-stone/20 rounded text-xs font-sans font-medium text-kumari-stone mr-2">
                Ctrl K
              </span>
              <button className="bg-kumari-bronze/10 hover:bg-kumari-bronze/20 text-kumari-bronze px-4 py-2 text-sm font-mono tracking-wider transition-colors border-l border-kumari-bronze/20">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
