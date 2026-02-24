import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Download, MessageSquare, Sun, Moon, Gamepad2, Shield, Monitor } from 'lucide-react';

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

const SkeletonCard = () => (
  <div className="p-5 rounded-2xl mc:rounded-none tank:rounded-sm bg-gray-50 dark:bg-[#161618] mc:bg-black/40 tank:bg-[#1a2315] border border-gray-200 dark:border-white/5 mc:border-white/20 tank:border-[#3a5a40] flex flex-col gap-3 animate-pulse">
    <div className="flex items-center justify-between w-full">
      <div className="h-5 w-32 bg-gray-200 dark:bg-white/10 mc:bg-white/20 tank:bg-[#3a5a40] rounded-md mc:rounded-none tank:rounded-sm" />
      <div className="h-4 w-4 bg-gray-200 dark:bg-white/10 mc:bg-white/20 tank:bg-[#3a5a40] rounded-full mc:rounded-none tank:rounded-sm" />
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-gray-200 dark:bg-white/10 mc:bg-white/20 tank:bg-[#3a5a40] rounded-md mc:rounded-none tank:rounded-sm" />
      <div className="h-3 w-2/3 bg-gray-200 dark:bg-white/10 mc:bg-white/20 tank:bg-[#3a5a40] rounded-md mc:rounded-none tank:rounded-sm" />
    </div>
  </div>
);

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'linux' | 'windows' | 'games' | 'streaming'>('linux');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [appMode, setAppMode] = useState<'default' | 'mc' | 'tank'>('default');
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    document.documentElement.classList.remove('mc-mode', 'tank-mode');
    if (appMode === 'mc') {
      document.documentElement.classList.add('mc-mode', 'dark');
    } else if (appMode === 'tank') {
      document.documentElement.classList.add('tank-mode', 'dark');
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [appMode, theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 mc:bg-black/40 mc:border-white/10 tank:bg-[#11140d]/90 tank:border-[#3a5a40]/50 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white mc:text-2xl tank:text-2xl tank:uppercase tank:tracking-widest tank:text-[#dad7cd]">VCTA's Site</div>
          <div className="flex items-center gap-4">
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
                className={`p-2 transition-colors rounded-full mc:rounded-none tank:rounded-sm ${appMode !== 'default' ? 'bg-black/40 border' : 'hover:bg-gray-100 dark:hover:bg-white/5'} ${appMode === 'mc' ? 'text-green-400 border-green-500/30' : appMode === 'tank' ? 'text-[#a3b18a] border-[#3a5a40]' : 'text-gray-500 dark:text-gray-400'}`}
                aria-label="Select Mode"
              >
                {appMode === 'default' && <Monitor className="w-5 h-5" />}
                {appMode === 'mc' && <Gamepad2 className="w-5 h-5" />}
                {appMode === 'tank' && <Shield className="w-5 h-5" />}
              </button>
              
              {isModeMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-[#161618] mc:bg-black mc:border mc:border-green-500/50 tank:bg-[#1a2315] tank:border tank:border-[#3a5a40] border border-gray-200 dark:border-white/10 rounded-xl mc:rounded-none tank:rounded-sm shadow-xl overflow-hidden flex flex-col z-50">
                  <button onClick={() => { setAppMode('default'); setIsModeMenuOpen(false); }} className="px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 mc:hover:bg-green-900/30 tank:hover:bg-[#3a5a40]/30 text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> Default
                  </button>
                  <button onClick={() => { setAppMode('mc'); setIsModeMenuOpen(false); }} className="px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 mc:hover:bg-green-900/30 tank:hover:bg-[#3a5a40]/30 text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" /> MC Mode
                  </button>
                  <button onClick={() => { setAppMode('tank'); setIsModeMenuOpen(false); }} className="px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 mc:hover:bg-green-900/30 tank:hover:bg-[#3a5a40]/30 text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Tank Mode
                  </button>
                </div>
              )}
            </div>
            <div className={`relative group flex items-center justify-center ${appMode !== 'default' ? 'hidden' : ''}`}>
              <button
                onClick={toggleTheme}
                className="p-2 transition-colors rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </div>
            </div>
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
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.1)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_50%)] mc:hidden tank:hidden pointer-events-none transition-colors duration-200" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto relative z-10 mc:bg-black/40 mc:p-8 mc:border mc:border-white/10 mc:backdrop-blur-sm tank:bg-[#11140d]/80 tank:p-10 tank:border-2 tank:border-[#3a5a40] tank:backdrop-blur-md tank:shadow-[0_0_50px_rgba(58,90,64,0.3)]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mc:rounded-none mc:bg-black/60 mc:border-green-500/50 mc:text-green-400 tank:rounded-sm tank:bg-[#1a2315] tank:border-[#588157] tank:text-[#a3b18a] tank:uppercase tank:tracking-widest bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-sm font-medium mb-8 text-indigo-600 dark:text-indigo-300 transition-colors duration-200">
            <span className="w-2 h-2 rounded-full mc:rounded-none mc:bg-green-500 tank:rounded-none tank:bg-[#a3b18a] bg-indigo-500 animate-pulse" />
            Tech, Community & Hangout
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white transition-colors duration-200">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 mc:from-green-400 mc:to-emerald-500 tank:from-[#a3b18a] tank:to-[#dad7cd] tank:uppercase tank:tracking-wider">
              VCTA's Site
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mc:text-gray-300 tank:text-[#8a9a70] mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-200">
            VCTA's Site for everything, discord, resources, cool modes and everything
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://discord.gg/x7a7WcPx6j" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full mc:rounded-none mc:bg-green-600 mc:hover:bg-green-500 mc:shadow-none tank:rounded-sm tank:bg-[#3a5a40] tank:hover:bg-[#588157] tank:shadow-none tank:border tank:border-[#a3b18a]/30 tank:uppercase tank:tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] dark:shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)]"
            >
              <MessageSquare className="w-5 h-5" />
              Join Discord
            </a>
            <button 
              onClick={scrollToExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-full mc:rounded-none mc:bg-black/60 mc:border-white/20 mc:hover:bg-black/80 tank:rounded-sm tank:bg-[#11140d] tank:border-[#3a5a40] tank:hover:bg-[#1a2315] tank:text-[#a3b18a] tank:uppercase tank:tracking-wider bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium transition-all flex items-center justify-center gap-2"
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
          <div className="bg-white dark:bg-[#0f0f11] mc:bg-black/60 mc:backdrop-blur-md mc:border-white/10 mc:rounded-none tank:bg-[#11140d]/90 tank:backdrop-blur-lg tank:border-2 tank:border-[#3a5a40] tank:rounded-sm rounded-[2rem] p-8 md:p-12 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/5 transition-colors duration-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tank:uppercase tank:tracking-wider tank:text-[#dad7cd]">Downloads & Resources</h2>
              
              {/* Pill Toggle */}
              <div className="inline-flex flex-wrap justify-center p-1.5 bg-gray-100 dark:bg-[#050505] mc:bg-black/40 mc:border-white/10 mc:rounded-none tank:bg-[#1a2315] tank:border-[#3a5a40] tank:rounded-sm rounded-3xl md:rounded-full border border-gray-200 dark:border-white/5 transition-colors duration-200 gap-1 relative">
                {[
                  { id: 'linux', label: 'Linux Distros' },
                  { id: 'windows', label: 'Windows ISOs' },
                  { id: 'games', label: 'Cracked Games' },
                  { id: 'streaming', label: 'Free Streaming' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-6 py-2.5 rounded-full mc:rounded-none tank:rounded-sm tank:uppercase tank:tracking-wider text-sm font-medium transition-colors duration-200 z-10 ${
                      activeTab === tab.id 
                        ? 'text-white tank:text-[#11140d]' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5 mc:hover:bg-white/10 tank:hover:bg-[#3a5a40]/40 tank:text-[#8a9a70]'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-indigo-600 mc:bg-green-600 tank:bg-[#a3b18a] rounded-full mc:rounded-none tank:rounded-sm shadow-md -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-white/5 mb-10 transition-colors duration-200" />

            {/* Content */}
            <motion.div layout className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SkeletonGrid />
                  </motion.div>
                ) : activeTab === 'linux' ? (
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
                        className="group p-5 rounded-2xl mc:rounded-none mc:bg-black/40 mc:border-white/10 mc:hover:border-green-500/50 tank:rounded-sm tank:bg-[#1a2315] tank:border-[#3a5a40] tank:hover:border-[#a3b18a] tank:hover:bg-[#232f1c] bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 mc:group-hover:text-green-400 tank:text-[#dad7cd] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {distro.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 mc:group-hover:text-green-400 tank:text-[#588157] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mc:text-gray-400 tank:text-[#8a9a70] leading-relaxed">
                          {distro.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                ) : activeTab === 'windows' ? (
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
                        className="group p-5 rounded-2xl mc:rounded-none mc:bg-black/40 mc:border-white/10 mc:hover:border-green-500/50 tank:rounded-sm tank:bg-[#1a2315] tank:border-[#3a5a40] tank:hover:border-[#a3b18a] tank:hover:bg-[#232f1c] bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 mc:group-hover:text-green-400 tank:text-[#dad7cd] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {iso.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 mc:group-hover:text-green-400 tank:text-[#588157] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mc:text-gray-400 tank:text-[#8a9a70] leading-relaxed">
                          {iso.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                ) : activeTab === 'games' ? (
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
                        className="group p-5 rounded-2xl mc:rounded-none mc:bg-black/40 mc:border-white/10 mc:hover:border-green-500/50 tank:rounded-sm tank:bg-[#1a2315] tank:border-[#3a5a40] tank:hover:border-[#a3b18a] tank:hover:bg-[#232f1c] bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 mc:group-hover:text-green-400 tank:text-[#dad7cd] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {game.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 mc:group-hover:text-green-400 tank:text-[#588157] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mc:text-gray-400 tank:text-[#8a9a70] leading-relaxed">
                          {game.description}
                        </p>
                      </motion.a>
                    ))}
                  </motion.div>
                ) : (
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
                        className="group p-5 rounded-2xl mc:rounded-none mc:bg-black/40 mc:border-white/10 mc:hover:border-green-500/50 tank:rounded-sm tank:bg-[#1a2315] tank:border-[#3a5a40] tank:hover:border-[#a3b18a] tank:hover:bg-[#232f1c] bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-900 dark:text-gray-100 mc:group-hover:text-green-400 tank:text-[#dad7cd] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {site.name}
                          </span>
                          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 mc:group-hover:text-green-400 tank:text-[#588157] tank:group-hover:text-[#a3b18a] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mc:text-gray-400 tank:text-[#8a9a70] leading-relaxed">
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

      {/* Support Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-[#0f0f11] mc:bg-black/60 mc:backdrop-blur-md mc:border-white/10 mc:rounded-none tank:bg-[#11140d]/90 tank:backdrop-blur-lg tank:border-2 tank:border-[#3a5a40] tank:rounded-sm rounded-[2rem] p-8 md:p-12 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/5 transition-colors duration-200">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tank:uppercase tank:tracking-wider tank:text-[#dad7cd] mb-8 text-center">Contact Support</h2>
            <form action="https://formsubmit.co/alphakoko23@gmail.com" method="POST" className="flex flex-col gap-5">
              <input type="hidden" name="_subject" value="New Support Request from VCTA's Site!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] mb-2">Name</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-3 rounded-xl mc:rounded-none tank:rounded-sm bg-gray-50 dark:bg-[#161618] mc:bg-black/40 tank:bg-[#1a2315] border border-gray-200 dark:border-white/5 mc:border-white/20 tank:border-[#3a5a40] focus:border-indigo-500 dark:focus:border-indigo-500 mc:focus:border-green-500 tank:focus:border-[#a3b18a] focus:ring-2 focus:ring-indigo-500/20 mc:focus:ring-green-500/20 tank:focus:ring-[#a3b18a]/20 text-gray-900 dark:text-white outline-none transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] mb-2">Email</label>
                <input type="email" name="email" id="email" required className="w-full px-4 py-3 rounded-xl mc:rounded-none tank:rounded-sm bg-gray-50 dark:bg-[#161618] mc:bg-black/40 tank:bg-[#1a2315] border border-gray-200 dark:border-white/5 mc:border-white/20 tank:border-[#3a5a40] focus:border-indigo-500 dark:focus:border-indigo-500 mc:focus:border-green-500 tank:focus:border-[#a3b18a] focus:ring-2 focus:ring-indigo-500/20 mc:focus:ring-green-500/20 tank:focus:ring-[#a3b18a]/20 text-gray-900 dark:text-white outline-none transition-all" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mc:text-green-400 tank:text-[#a3b18a] mb-2">Problem</label>
                <textarea name="problem" id="problem" required rows={4} className="w-full px-4 py-3 rounded-xl mc:rounded-none tank:rounded-sm bg-gray-50 dark:bg-[#161618] mc:bg-black/40 tank:bg-[#1a2315] border border-gray-200 dark:border-white/5 mc:border-white/20 tank:border-[#3a5a40] focus:border-indigo-500 dark:focus:border-indigo-500 mc:focus:border-green-500 tank:focus:border-[#a3b18a] focus:ring-2 focus:ring-indigo-500/20 mc:focus:ring-green-500/20 tank:focus:ring-[#a3b18a]/20 text-gray-900 dark:text-white outline-none transition-all resize-none" placeholder="Describe your problem here..."></textarea>
              </div>
              <button type="submit" className="mt-4 w-full py-4 rounded-xl mc:rounded-none tank:rounded-sm bg-indigo-600 hover:bg-indigo-500 mc:bg-green-600 mc:hover:bg-green-500 tank:bg-[#3a5a40] tank:hover:bg-[#588157] text-white font-medium transition-all shadow-md tank:uppercase tank:tracking-wider">
                Send Support Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 dark:border-white/5 text-gray-500 text-sm transition-colors duration-200">
        <p>&copy; {new Date().getFullYear()} VCTA's Site. All rights reserved.</p>
      </footer>
    </div>
  );
}
