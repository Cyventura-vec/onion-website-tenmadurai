import { motion } from 'framer-motion'
import { BookOpen, Database, Users, Shield } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
            <h1 className="text-4xl font-serif text-kumari-gold tracking-widest mb-4">ABOUT PROJECT AAZHI</h1>
          <p className="font-mono text-kumari-stone tracking-[0.2em] text-sm uppercase">Historical & Archaeological Research Archive</p>
          <div className="w-24 h-px bg-kumari-bronze/40 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="kumari-card p-8">
            <div className="w-12 h-12 bg-kumari-bronze/10 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-kumari-bronze" />
            </div>
            <h2 className="text-xl font-serif text-kumari-parchment mb-4">Historical Scope</h2>
            <p className="text-kumari-stone font-sans text-sm leading-relaxed">
              Project AAZHI is dedicated to the systematic study and digitization of historical records associated with Kumari Kandam and ancient Tenmadurai. Our initiative seeks to preserve historical truth and cultural heritage through meticulous archaeological correlation.
            </p>
          </div>

          <div className="kumari-card p-8">
            <div className="w-12 h-12 bg-kumari-bronze/10 rounded-full flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-kumari-bronze" />
            </div>
            <h2 className="text-xl font-serif text-kumari-parchment mb-4">Digital Preservation</h2>
            <p className="text-kumari-stone font-sans text-sm leading-relaxed">
              The core mandate of this organization is preserving fragile historical records for future researchers. This portal provides open access to digitized research material and historical chronicles.
            </p>
          </div>

          <div className="kumari-card p-8">
            <div className="w-12 h-12 bg-kumari-bronze/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-kumari-bronze" />
            </div>
            <h2 className="text-xl font-serif text-kumari-parchment mb-4">Research Team</h2>
            <p className="text-kumari-stone font-sans text-sm leading-relaxed">
              Our interdisciplinary team consists of archaeologists, linguists specializing in ancient scripts, and historians working together to map the cultural timeline of Tenmadurai.
            </p>
          </div>

          <div className="kumari-card p-8">
            <div className="w-12 h-12 bg-kumari-bronze/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-kumari-bronze" />
            </div>
            <h2 className="text-xl font-serif text-kumari-parchment mb-4">Archive Integrity</h2>
            <p className="text-kumari-stone font-sans text-sm leading-relaxed">
              All documents in the public collection are preserved in their authentic historical form to support academic investigation and public learning.
            </p>
          </div>
        </div>

        {/* Tenmadurai specific section */}
        <div className="relative p-10 border border-kumari-bronze/20 bg-kumari-gray/30 overflow-hidden group rounded-sm mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-kumari-gold/5 rounded-full blur-3xl group-hover:bg-kumari-gold/10 transition-colors duration-1000"></div>
          
          <h2 className="text-2xl font-serif text-kumari-gold tracking-wider mb-6 relative z-10">THE TENMADURAI CHRONICLES</h2>
          
          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-black/40 border border-kumari-bronze/10 rounded-sm">
              <h3 className="font-serif text-lg text-kumari-parchment mb-2">I. The Fall of Tenmadurai</h3>
              <p className="font-sans text-kumari-stone text-sm leading-relaxed whitespace-pre-line">
                Tenmadurai was once regarded as the intellectual heart of the kingdom—a city where scholars, poets, philosophers, astronomers, and historians gathered beneath the protection of the royal court. Its great library was more than a collection of books; it was a living institution where knowledge was preserved, debated, and passed from one generation to the next.

                But under King Vetrivel, the relationship between the throne and the scholars began to deteriorate.

                Vetrivel increasingly viewed the scholars' counsel as an inconvenience rather than a necessity. Their warnings about the kingdom's finances, education, and long-term stability were repeatedly dismissed in favor of advice that promised immediate prestige and luxury. What had once been invested in schools, manuscripts, observatories, and public learning was gradually redirected toward foreign luxuries and extravagant displays at court.

                The scholars protested. They presented reports, petitions, and historical records warning that a kingdom that abandoned knowledge would eventually lose the ability to govern itself. Yet their voices carried little weight within Vetrivel's court.

                With fewer scholars remaining, the great library slowly fell silent. Within a decade, the city had changed dramatically—its scholars scattered, its institutions weakened, and its once-great library stood almost empty.

                A kingdom does not lose its knowledge in a single day. It loses it whenever those who possess it are no longer heard.
              </p>
            </div>

            <div className="p-6 bg-black/40 border border-kumari-bronze/10 rounded-sm">
              <h3 className="font-serif text-lg text-kumari-parchment mb-2">II. The Street Academies</h3>
              <p className="font-sans text-kumari-stone text-sm leading-relaxed">
                With the royal academies defunded, scholars began teaching in the streets. Children, farmers, and merchants gathered to learn what they could — an informal academy born of necessity and preserved through stubborn conviction.
              </p>
            </div>

            <div className="p-6 bg-black/40 border border-kumari-bronze/10 rounded-sm">
              <h3 className="font-serif text-lg text-kumari-parchment mb-2">III. Public Apathy</h3>
              <p className="font-sans text-kumari-stone text-sm leading-relaxed">
                Dazzled by imported goods and spectacle, the public largely ignored the street scholars. Only the poor and the elderly, with nothing else to occupy them, continued to attend. The scholars kept teaching regardless.
              </p>
            </div>

            <div className="p-6 bg-black/40 border border-kumari-bronze/10 rounded-sm">
              <h3 className="font-serif text-lg text-kumari-parchment mb-2">IV. Consequences & Loss</h3>
              <p className="font-sans text-kumari-stone text-sm leading-relaxed">
                No new generation of scholars arose to replace the old. Oral traditions frayed and were lost within two generations. The city did not fall to war or disaster — it simply forgot itself, and its knowledge perished with the last who remembered it.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
