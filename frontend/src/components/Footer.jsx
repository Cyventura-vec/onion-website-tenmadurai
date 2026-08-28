export default function Footer() {
  return (
    <footer className="border-t border-kumari-bronze/10 bg-black/40 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="font-serif text-xl font-bold tracking-widest text-kumari-parchment/80">PROJECT AAZHI</h2>
            <p className="font-mono text-xs text-kumari-stone mt-1">Research Archive &bull; Public Research Portal</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="font-mono text-[10px] text-kumari-stone/60 mb-2">PORTAL VERSION: 4.2.1-ARCHIVE</p>
            <p className="font-serif text-sm text-kumari-stone">
              &copy; 2027 Project AAZHI Research Consortium
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
