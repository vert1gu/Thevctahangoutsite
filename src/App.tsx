import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Download, MessageSquare, Sun, Moon, Gamepad2 } from 'lucide-react';

const linuxDistros = [
  { name: 'Void Linux', url: 'https://voidlinux.org/download/', description: 'Independent, rolling-release distro with runit init system.' },
  { name: 'NixOS', url: 'https://nixos.org/download/', description: 'Declarative, reproducible system configuration.' },
  { name: 'Arch Linux', url: 'https://archlinux.org/download/', description: 'Lightweight, flexible, DIY rolling release.' },
  { name: 'LMDE', url: 'https://linuxmint.com/download_lmde.php', description: 'Linux Mint Debian Edition for maximum stability.' },
  { name: 'Linux Mint', url: 'https://linuxmint.com/download.php', description: 'User-friendly, elegant, and comfortable OS.' },
  { name: 'Debian', url: 'https://www.debian.org/', description: 'The universal, rock-solid operating system.' },
  { name: 'Fedora', url: 'https://fedoraproject.org/', description: 'Cutting-edge, innovative, and open source.' },
  { name: 'Rocky Linux', url: 'https://rockylinux.org/download', description: 'Enterprise-ready, bug-for-bug RHEL compatible.' },
  { name: 'Ubuntu', url: 'https://ubuntu.com/#download-ubuntu', description: 'Popular, accessible, and widely supported.' },
  { name: 'CachyOS', url: 'https://cachyos.org/download/', description: 'Performance-tuned, heavily optimized Arch derivative.' },
];

const windowsIsos = [
  { name: 'Windows X-Lite', url: 'https://windowsxlite.com/downloads/', description: 'Debloated, optimized custom Windows builds.' },
  { name: 'KernelOS', url: 'https://kernelos.org/#downloads', description: 'Performance-focused custom Windows OS.' },
  { name: 'Windows 11 LTSC', url: 'https://buzzheavier.com/2gtemvaqgfm3', description: 'Long-Term Servicing Channel for Windows 11.' },
  { name: 'Windows 10 LTSC', url: 'https://buzzheavier.com/yhggy3l1e5oq', description: 'Stable, bloat-free Windows 10 enterprise.' },
];

const crackedGames = [
  { name: 'SteamRIP', url: 'https://steamrip.com/', description: 'Pre-installed Steam games for direct download.' },
];

const freeStreaming = [
  { name: 'Flixmomo', url: 'https://flixmomo.tv/', description: 'Free movies and TV shows streaming.' },
  { name: 'HiAnime', url: 'https://hianime.to/', description: 'Watch anime online for free in high quality.' },
  { name: 'Anikai', url: 'https://anikai.to/', description: 'Ad-free anime streaming platform.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'linux' | 'windows' | 'games' | 'streaming'>('linux');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mcFont, setMcFont] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (mcFont) {
      document.documentElement.classList.add('mc-font');
    } else {
      document.documentElement.classList.remove('mc-font');
    }
  }, [mcFont]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">VCTA Hangout</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMcFont(!mcFont)}
              className={`p-2 transition-colors rounded-full ${mcFont ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'}`}
              aria-label="Toggle Minecraft Font"
              title="Toggle Minecraft Font"
            >
              <Gamepad2 className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="https://discord.gg/x7a7WcPx6j" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.1)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_50%)] pointer-events-none transition-colors duration-200" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-sm font-medium mb-8 text-indigo-600 dark:text-indigo-300 transition-colors duration-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Tech, Community & Hangout
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white transition-colors duration-200">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              VCTA Hangout
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-200">
            The ultimate community for everything tech, hanging out, and everything in between.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://discord.gg/x7a7WcPx6j" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] dark:shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)]"
            >
              <MessageSquare className="w-5 h-5" />
              Join Discord
            </a>
            <button 
              onClick={scrollToExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              Explore Resources
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Explore Section */}
      <section ref={exploreRef} className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-[#0f0f11] rounded-[2rem] p-8 md:p-12 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/5 transition-colors duration-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Downloads & Resources</h2>
              
              {/* Pill Toggle */}
              <div className="inline-flex flex-wrap justify-center p-1 bg-gray-100 dark:bg-[#050505] rounded-3xl md:rounded-full border border-gray-200 dark:border-white/5 transition-colors duration-200 gap-1">
                <button
                  onClick={() => setActiveTab('linux')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'linux' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Linux Distros
                </button>
                <button
                  onClick={() => setActiveTab('windows')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'windows' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Windows ISOs
                </button>
                <button
                  onClick={() => setActiveTab('games')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'games' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Cracked Games
                </button>
                <button
                  onClick={() => setActiveTab('streaming')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'streaming' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Free Streaming
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-white/5 mb-10 transition-colors duration-200" />

            {/* Content */}
            <motion.div layout className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'linux' && (
                  <motion.div
                    key="linux"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {linuxDistros.map((distro) => (
                      <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={distro.name}
                        href={distro.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-5 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {distro.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {distro.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'windows' && (
                  <motion.div
                    key="windows"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {windowsIsos.map((iso) => (
                      <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={iso.name}
                        href={iso.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-5 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {iso.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {iso.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'games' && (
                  <motion.div
                    key="games"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {crackedGames.map((game) => (
                      <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={game.name}
                        href={game.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-5 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {game.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {game.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'streaming' && (
                  <motion.div
                    key="streaming"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {freeStreaming.map((site) => (
                      <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={site.name}
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-5 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {site.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {site.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="w-full h-px bg-gray-200 dark:bg-white/5 mt-10 mb-8 transition-colors duration-200" />

            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                For more resources and discussions,{' '}
                <a 
                  href="https://discord.gg/x7a7WcPx6j" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline underline-offset-4 transition-colors"
                >
                  join our Discord server!
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 dark:border-white/5 text-gray-500 text-sm transition-colors duration-200">
        <p>&copy; {new Date().getFullYear()} VCTA Hangout. All rights reserved.</p>
      </footer>
    </div>
  );
}
