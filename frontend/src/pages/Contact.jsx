import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus('')

    const formData = new FormData(e.target)

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })

      const result = await response.text()

      if (response.ok) {
        setStatus(result || 'Message sent successfully.')
        e.target.reset()
      } else {
        setStatus('Unable to send message.')
      }
    } catch (error) {
      setStatus('Unable to connect to the archive.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-kumari-gold tracking-widest mb-4">
            CONTACT THE ARCHIVE
          </h1>

          <p className="font-mono text-kumari-stone tracking-[0.2em] text-sm uppercase">
            Research & Archive Correspondence
          </p>

          <div className="w-24 h-px bg-kumari-bronze/40 mx-auto mt-8" />
        </div>

        <div className="kumari-card p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-kumari-bronze/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-kumari-bronze" />
            </div>

            <div>
              <h2 className="text-xl font-serif text-kumari-parchment">
                Send a Message
              </h2>

              <p className="text-kumari-stone font-mono text-xs mt-1">
                ARCHIVE CORRESPONDENCE
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block font-mono text-sm text-kumari-stone mb-2">
                NAME
              </label>

              <input
                type="text"
                name="name"
                required
                className="w-full bg-black/40 border border-kumari-bronze/20 rounded-sm px-4 py-3 text-kumari-parchment focus:outline-none focus:border-kumari-gold"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-kumari-stone mb-2">
                EMAIL
              </label>

              <input
                type="text"
                name="email"
                required
                className="w-full bg-black/40 border border-kumari-bronze/20 rounded-sm px-4 py-3 text-kumari-parchment focus:outline-none focus:border-kumari-gold"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-kumari-stone mb-2">
                MESSAGE
              </label>

              <textarea
                name="message"
                required
                rows="7"
                className="w-full bg-black/40 border border-kumari-bronze/20 rounded-sm px-4 py-3 text-kumari-parchment focus:outline-none focus:border-kumari-gold resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 border border-kumari-bronze/40 px-6 py-3 font-mono text-sm text-kumari-parchment hover:text-kumari-gold hover:border-kumari-gold transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />

              {sending ? 'TRANSMITTING...' : 'SEND MESSAGE'}
            </button>

          </form>

          {status && (
            <div className="mt-6 p-4 border border-kumari-bronze/20 bg-black/30">
              <p className="font-mono text-sm text-kumari-stone">
                {status}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}