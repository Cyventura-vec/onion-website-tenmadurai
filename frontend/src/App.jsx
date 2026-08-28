import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import DocumentViewer from './pages/DocumentViewer'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen flex flex-col relative z-0">
      {/* Subtle animated background overlay */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
      }}></div>
      
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs/:category/:filename" element={<DocumentViewer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
