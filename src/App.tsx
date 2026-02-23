import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Monitor, ChevronRight, Download, MessageSquare } from 'lucide-react';

const linuxDistros = [
  { name: 'Void Linux', url: 'https://voidlinux.org/download/' },
  { name: 'NixOS', url: 'https://nixos.org/download/' },
  { name: 'Arch Linux', url: 'https://archlinux.org/download/' },
  { name: 'LMDE', url: 'https://linuxmint.com/download_lmde.php' },
  { name: 'Linux Mint', url: 'https://linuxmint.com/download.php' },
  { name: 'Debian', url: 'https://www.debian.org/' },
  { name: 'Fedora', url: 'https://fedoraproject.org/' },
  { name: 'Rocky Linux', url: 'https://rockylinux.org/download' },
  { name: 'Ubuntu', url: 'https://ubuntu.com/#download-ubuntu' },
  { name: 'CachyOS', url: 'https://cachyos.org/download/' },
];

const windowsIsos = [
  { name: 'Windows X-Lite', url: 'https://windowsxlite.com/downloads/' },
  { name: 'KernelOS', url: 'https://kernelos.org/#downloads' },
  { name: 'Windows 11 LTSC', url: 'https://buzzheavier.com/2gtemvaqgfm3' },
  { name: 'Windows 10 LTSC', url: 'https://buzzheavier.com/yhggy3l1e5oq' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'linux' | 'windows'>('linux');
  const exploreRef = useRef<HTMLDivElement>(null);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tight">VCTA Hangout</div>
          <div className="flex items-center gap-4">
            <a 
              href="https://discord.gg/x7a7WcPx6j" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_50%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Tech, Community & Hangout
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              VCTA Hangout
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A place for tech enthusiasts to connect, share knowledge, and discover the best tools, distros, and resources.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://discord.gg/x7a7WcPx6j" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)]"
            >
              <MessageSquare className="w-5 h-5" />
              Join Discord
            </a>
            <button 
              onClick={scrollToExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              Explore Resources
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Explore Section */}
      <section ref={exploreRef} className="py-24 px-6 relative border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Curated Resources</h2>
            <p className="text-gray-400">Essential downloads for your next setup.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('linux')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'linux' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Terminal className="w-4 h-4" />
                Linux Distros
              </button>
              <button
                onClick={() => setActiveTab('windows')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'windows' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Windows ISOs
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'linux' && (
                <motion.div
                  key="linux"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {linuxDistros.map((distro) => (
                    <a
                      key={distro.name}
                      href={distro.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                        {distro.name}
                      </span>
                      <Download className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                    </a>
                  ))}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8 text-center p-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-indigo-200 font-medium mb-4">Looking for more distros or need help choosing?</p>
                    <a 
                      href="https://discord.gg/x7a7WcPx6j" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Join our Discord server! <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === 'windows' && (
                <motion.div
                  key="windows"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
                >
                  {windowsIsos.map((iso) => (
                    <a
                      key={iso.name}
                      href={iso.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                        {iso.name}
                      </span>
                      <Download className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} VCTA Hangout. All rights reserved.</p>
      </footer>
    </div>
  );
}
