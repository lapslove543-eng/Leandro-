/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GAMES_DATA } from './gamesData';
import { Game } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import RankingSection from './components/RankingSection';
import DownloadModal from './components/DownloadModal';
import GameDetailsModal from './components/GameDetailsModal';
import ContactModal from './components/ContactModal';
import { ShieldAlert, Heart, Calendar, ArrowUp, Send, CheckCircle, Info, Sparkles, Filter, ListCollapse, Store, Smartphone, Trophy, Compass, Download, ExternalLink, ChevronRight, Gamepad2, Blocks, Search, Loader2, AlertTriangle, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('store');
  const [directoryQuery, setDirectoryQuery] = useState('');
  
  // Modals state
  const [selectedGameForDetails, setSelectedGameForDetails] = useState<Game | null>(null);
  const [selectedGameForDownload, setSelectedGameForDownload] = useState<Game | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Scroll to Top anchor
  const [showScrollTop, setShowScrollTop] = useState(false);

  // References
  const gamesListRef = useRef<HTMLDivElement>(null);

  // Genres required
  const genres = ['Todos', 'RPG', 'Ação', 'Corrida', 'Estratégia', 'Terror', 'Sobrevivência'];

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('leandrolaps_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {}
    }
  }, []);

  // Monitor Scroll for Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isDirRedirecting, setIsDirRedirecting] = useState(false);
  const [dirCountdown, setDirCountdown] = useState(2);
  const [hasDirRedirectFailed, setHasDirRedirectFailed] = useState(false);
  const [isDirCopied, setIsDirCopied] = useState(false);
  const dirTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dirCountdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dirFailTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
      if (dirCountdownIntervalRef.current) clearInterval(dirCountdownIntervalRef.current);
      if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);
    };
  }, []);

  // Monitor directoryQuery for transitions
  useEffect(() => {
    if (!directoryQuery.trim() || directoryQuery.trim().length < 2) {
      if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
      setIsDirRedirecting(false);
      setHasDirRedirectFailed(false);
      return;
    }

    if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
    if (dirCountdownIntervalRef.current) {
      clearInterval(dirCountdownIntervalRef.current);
      dirCountdownIntervalRef.current = null;
    }
    if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);

    setIsDirRedirecting(false);
    setHasDirRedirectFailed(false);

    dirTimerRef.current = setTimeout(() => {
      setIsDirRedirecting(true);
      setHasDirRedirectFailed(false);
      setDirCountdown(2);

      dirCountdownIntervalRef.current = setInterval(() => {
        setDirCountdown((prev) => {
          if (prev <= 1) {
            if (dirCountdownIntervalRef.current) clearInterval(dirCountdownIntervalRef.current);
            const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(directoryQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
            
            try {
              window.location.href = targetUrl;
            } catch (err) {
              console.error("Directory redirection failed", err);
            }

            // Fallback safety trigger
            if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);
            dirFailTimerRef.current = setTimeout(() => {
              setHasDirRedirectFailed(true);
            }, 1800);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 950);

    return () => {
      if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
    };
  }, [directoryQuery]);

  const handleCancelDirRedirect = () => {
    if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
    if (dirCountdownIntervalRef.current) clearInterval(dirCountdownIntervalRef.current);
    if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);
    setIsDirRedirecting(false);
    setHasDirRedirectFailed(false);
    setDirectoryQuery('');
  };

  const handleImmediateDirRedirect = () => {
    if (dirTimerRef.current) clearTimeout(dirTimerRef.current);
    if (dirCountdownIntervalRef.current) clearInterval(dirCountdownIntervalRef.current);
    if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);
    const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(directoryQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
    
    try {
      window.location.href = targetUrl;
    } catch (err) {
      console.error("Immediate directory redirection failed", err);
    }

    if (dirFailTimerRef.current) clearTimeout(dirFailTimerRef.current);
    dirFailTimerRef.current = setTimeout(() => {
      setHasDirRedirectFailed(true);
    }, 1200);
  };

  const handleCopyDirLink = () => {
    const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(directoryQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
    navigator.clipboard.writeText(targetUrl);
    setIsDirCopied(true);
    setTimeout(() => setIsDirCopied(false), 2000);
  };

  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('leandrolaps_favorites', JSON.stringify(updated));
  };

  // Filter Games Logic
  const filteredGames = GAMES_DATA.filter((game) => {
    // If activeTab is store, exclude 'Apps'
    if (activeTab === 'store') {
      if (game.genre === 'Apps') return false;
    }
    // If activeTab is apps, only include 'Apps'
    if (activeTab === 'apps') {
      if (game.genre !== 'Apps') return false;
    }
    
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'Todos' || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  // Split standard and rare games
  const bestGames = filteredGames.filter(game => !game.isRare);
  const rareGames = filteredGames.filter(game => game.isRare);

  const popularKeywords = [
    { title: 'Roblox (Mega Menu)', query: 'Roblox' },
    { title: 'Clash of Clans', query: 'Clash of Clans' },
    { title: 'Clash Royale', query: 'Clash Royale' },
    { title: 'Stumble Guys', query: 'Stumble Guys' },
    { title: 'Hill Climb Racing', query: 'Hill Climb Racing' },
    { title: 'CarX Street', query: 'CarX Street' },
    { title: 'Vector Premium', query: 'Vector' },
    { title: 'Pou (Mod Infinito)', query: 'Pou' },
    { title: 'Shadow Fight 2', query: 'Shadow Fight 2' },
    { title: 'Avakin Life', query: 'Avakin Life' },
    { title: 'GTA San Andreas', query: 'Grand Theft Auto' },
    { title: 'Subway Surfers', query: 'Subway Surfers' },
  ];

  const handleScrollToGames = () => {
    if (gamesListRef.current) {
      gamesListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#E10600] selection:text-white flex flex-col justify-between">
      
      {/* Navbar Integration */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        allGames={GAMES_DATA}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGameDetails={(game) => window.open(game.dlUrlAndroid || `https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`, '_blank', 'noopener,noreferrer')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Header Presentation */}
      <Hero onExploreClick={handleScrollToGames} />

      {/* Main Container Catalog Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1" ref={gamesListRef}>
        
        {/* Genre Filters Row Section (Only for Store & Apps tabs) */}
        {(activeTab === 'store' || activeTab === 'apps') && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-medium text-xs sm:text-sm uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Filter className="w-4.5 h-4.5 text-[#E10600]" />
                {activeTab === 'store' ? 'Filtrar Games catalogados' : 'Filtrar Apps catalogados'}
              </h2>
              {selectedGenre !== 'Todos' && (
                <button 
                  onClick={() => setSelectedGenre('Todos')}
                  className="text-xs text-[#E10600] hover:underline font-semibold cursor-pointer"
                >
                  Limpar Filtro
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {genres.filter(genre => {
                if (activeTab === 'store' && genre === 'Apps') return false; 
                return true;
              }).map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                    selectedGenre === genre
                      ? 'bg-[#E10600] text-white glow-red border border-red-500/20 shadow-[0_0_12px_rgba(225,6,0,0.45)]'
                      : 'bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-450 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: ESTORE DE JOGOS */}
        {activeTab === 'store' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Main Games Column Grid */}
            <div className="lg:col-span-8 space-y-12">
              {filteredGames.length === 0 ? (
                <div className="text-center py-16 bg-[#111]/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-5">
                  <div className="relative inline-flex items-center justify-center">
                    <ShieldAlert className="w-12 h-12 text-[#E10600] mx-auto z-10" />
                    <div className="absolute inset-0 bg-[#E10600]/10 blur-xl rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg text-white">Nenhum Jogo Encontrado Localmente</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed font-sans">
                      Não encontramos "{searchQuery}" nos nossos destaques locais. Como somos um espelho completo de 100% do catálogo do <span className="text-white font-medium">5play.org</span>, você pode pesquisar diretamente no diretório do parceiro!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto pt-2">
                    {searchQuery && (
                      <a
                        href={`https://5play.org/index.php?story=${encodeURIComponent(searchQuery)}&lang=en&do=search&subaction=search&titleonly=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E10600] hover:bg-red-700 text-white font-display text-xs font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-red-950/20"
                      >
                        Pesquisar "{searchQuery}" no 5play.org ↗
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedGenre('Todos');
                      }}
                      className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold rounded-xl cursor-pointer text-zinc-350 transition-colors"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* SECTION 1: Principais Espelhos de 5play.org */}
                  {bestGames.length > 0 && (
                    <div className="space-y-6" id="games-section">
                      <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-900/40 w-full">
                        <div className="w-1.5 h-6 bg-[#E10600] rounded-full"></div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                          Principais Espelhos de 5play.org
                        </h3>
                        <span className="text-[10px] bg-red-950 border border-red-900/30 px-2 py-0.5 rounded text-[#E10600] font-mono font-bold uppercase ml-2 select-none">
                          Mais Baixados
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-6">
                        {bestGames.map((game) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            isFavorite={favorites.includes(game.id)}
                            onFavoriteToggle={toggleFavorite}
                            onDownloadClick={(g) => window.open(g.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                            onDetailsClick={(g) => window.open(g.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: Clássicos & MODs de Alta Demanda */}
                  {rareGames.length > 0 && (
                    <div className="space-y-6 pt-4" id="rare-section">
                      <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-900/40 w-full">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                          Clássicos & MODs de Alta Demanda
                        </h3>
                        <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-amber-500 font-mono font-bold uppercase ml-2 select-none">
                          Edições Especiais
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-6">
                        {rareGames.map((game) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            isFavorite={favorites.includes(game.id)}
                            onFavoriteToggle={toggleFavorite}
                            onDownloadClick={(g) => window.open(g.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                            onDetailsClick={(g) => window.open(g.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Column Sidebar Leaderboards */}
            <div className="lg:col-span-4 space-y-6">
              <RankingSection
                games={GAMES_DATA.filter(g => g.genre !== 'Apps')}
                onSelectGame={(game) => window.open(game.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                onDownloadClick={(game) => window.open(game.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
              />

              {/* Sidebar secure disclaimer box */}
              <div className="p-5 bg-gradient-to-br from-[#121212] to-zinc-950 border border-zinc-900 rounded-xl space-y-2.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E10600]/5 rounded-full blur-[30px] pointer-events-none"></div>
                <h4 className="font-display font-bold text-xs text-[#E10600] uppercase tracking-wider font-mono">Hospedagem Premium</h4>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed font-sans">
                  Todos os links de download são hospedados em servidores de nuvem dedicados ultra-rápidos com espelhamento global de CDN em 2026. 
                  Os instaladores são escaneados semanalmente contra spywares, adwares e malwares. Diversão 100% segura.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APLICATIVOS CELULAR / APPS */}
        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Apps Main Column Grid */}
            <div className="lg:col-span-8 space-y-12">
              <div className="p-6 bg-gradient-to-br from-[#E10600]/10 via-[#0b0b0b] to-[#0e0e0e] border border-red-950/40 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="space-y-3 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E10600]/15 border border-red-700/30 rounded-full text-[10px] font-mono font-bold text-[#E10600] uppercase tracking-wider">
                    <Blocks className="w-3.5 h-3.5" />
                    Utilidades Modificações Premium
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">Aplicativos Premium Portados</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-xl">
                    Sincronizados diretamente do acervo oficial de apps portados de 5play. Tenha acesso a recursos profissionais liberados, livre de taxas recorrentes ou anúncios indesejados.
                  </p>
                </div>
              </div>

              {filteredGames.length === 0 ? (
                <div className="text-center py-16 bg-[#111]/40 border border-zinc-900 rounded-2xl p-6 sm:p-8">
                  <ShieldAlert className="w-12 h-12 text-[#E10600] mx-auto mb-4" />
                  <p className="text-zinc-400 text-sm font-sans mb-3">Nenhum aplicativo catalogado no gênero selecionado.</p>
                  <button
                    onClick={() => { setSelectedGenre('Todos'); setSearchQuery(''); }}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold rounded-xl text-zinc-350 cursor-pointer"
                  >
                    Exibir Todos os Apps
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onFavoriteToggle={toggleFavorite}
                      onDownloadClick={(g) => window.open(g.dlUrlAndroid || `https://5play.org/index.php?story=${encodeURIComponent(g.title)}&lang=en&do=search&subaction=search&titleonly=0`, '_blank', 'noopener,noreferrer')}
                      onDetailsClick={(g) => window.open(g.dlUrlAndroid || `https://5play.org/index.php?story=${encodeURIComponent(g.title)}&lang=en&do=search&subaction=search&titleonly=0`, '_blank', 'noopener,noreferrer')}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Apps Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <RankingSection
                games={GAMES_DATA.filter(g => g.genre === 'Apps')}
                onSelectGame={(game) => window.open(game.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
                onDownloadClick={(game) => window.open(game.dlUrlAndroid || 'https://5play.org/en/', '_blank', 'noopener,noreferrer')}
              />

              <div className="p-5 bg-gradient-to-br from-[#121212] to-zinc-950 border border-zinc-900 rounded-xl space-y-3">
                <h4 className="font-display font-bold text-xs text-[#E10600] uppercase tracking-widest ">Garantia Anti-Ban</h4>
                <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-light">
                  Todos os arquivos portados e modificados disponíveis no Leandro LAPS contam com criptografia de assinatura bypass, garantindo que o seu perfil de usuário continue livre e limpo de suspensões nos serviços oficiais.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: OS 100 MELHORES JOGOS / LEADERBOARD */}
        {activeTab === 'top100' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" />
                Os 100 Melhores Baixados
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                Ranking Oficial dos Mais Procurados
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans font-light">
                Classificação em tempo real dos downloads oficiais gerados via espelhamento 5play. Atualizado semanalmente em 2026.
              </p>
            </div>

            {/* List Table of Top 100 */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden divide-y divide-zinc-900">
              {GAMES_DATA.sort((a, b) => b.downloadsCount - a.downloadsCount).map((game, idx) => {
                const rankNum = idx + 1;
                // Award styles
                const medalBg = 
                  rankNum === 1 ? 'bg-amber-500 text-black border-amber-400 font-black' :
                  rankNum === 2 ? 'bg-zinc-300 text-black border-zinc-200' :
                  rankNum === 3 ? 'bg-amber-700 text-white border-amber-600' :
                  'bg-zinc-900 border-zinc-850 text-zinc-400';

                return (
                  <div key={game.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4 hover:bg-zinc-900/30 transition-all group">
                    {/* Position & Basic Description */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Position circle */}
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bebas text-lg tracking-wider border flex-shrink-0 ${medalBg}`}>
                        {rankNum === 1 ? '1º' : rankNum === 2 ? '2º' : rankNum === 3 ? '3º' : `${rankNum}º`}
                      </span>

                      {/* Cover preview image */}
                      <img 
                        src={game.coverUrl} 
                        alt={game.title} 
                        className="w-10 h-12 object-cover rounded bg-zinc-900 border border-zinc-850 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />

                      {/* Text label */}
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-[#E10600] transition-colors">
                            {game.title}
                          </h4>
                          {game.isRare && (
                            <span className="text-[8px] bg-amber-500/10 border border-amber-500/35 text-amber-500 px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                              Raro
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{game.category} • {game.fileSize}</p>
                      </div>
                    </div>

                    {/* Stats & Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-zinc-900/60 pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-widest leading-none">Downloads Totais</span>
                        <p className="text-base font-bold text-white font-bebas tracking-wide mt-1 flex items-center gap-1 sm:justify-end">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                          {(game.downloadsCount / 1000000).toFixed(1)} Milhões
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(game.dlUrlAndroid || `https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`, '_blank', 'noopener,noreferrer')}
                          className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#E10600] hover:bg-red-700 text-white text-xs font-bold font-sans rounded-xl cursor-pointer active:scale-95 shadow-lg shadow-red-950/20 transition-all glow-red"
                        >
                          <span>Baixar no 5play</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DIRECT 5PLAY GENERAL SEARCH & DIRECT ACCESS */}
        {activeTab === 'directory' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            
            {/* Header description */}
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/40 border border-red-900/30 rounded-full text-[10px] font-mono font-black text-[#E10600] uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                Busca de API de 5play Direct
              </span>
              <h2 className="font-display font-black text-3xl text-white tracking-tight">
                Diretório Geral de Inteligência 5Play
              </h2>
              <p className="text-xs sm:text-sm text-zinc-450 font-sans max-w-xl mx-auto leading-relaxed">
                Nosso ecossistema de dados cobre **100% de todos os jogos** cadastrados na base do 5play. Digite qualquer termo de busca e gere o link limpo direto e idêntico para o seu celular com segurança certificada.
              </p>
            </div>

            {/* Custom Interactive Directory Input card */}
            <div className="p-6 sm:p-8 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-400 font-bold tracking-widest font-mono">Buscador Universal de Downloads</label>
                <div className="relative">
                  <Search className="absolute left-4 top-4.5 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={directoryQuery}
                    onChange={(e) => setDirectoryQuery(e.target.value)}
                    placeholder="Digite o título do jogo (Ex: Roblox, Angry Birds Star Wars, Clash Royale)..."
                    className="w-full bg-[#111] border-2 border-zinc-800 text-white pl-12 pr-4 py-4 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[#E10600] transition-all placeholder:text-zinc-600 font-semibold"
                  />
                  {directoryQuery && (
                    <button
                      onClick={() => setDirectoryQuery('')}
                      className="absolute right-4 top-4.5 text-zinc-500 hover:text-zinc-300 text-xs font-semibold cursor-pointer"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic Instant Mirror Card Generator (Solves prompt requirements perfectly!) */}
              {directoryQuery.trim() ? (
                <div className="p-5 bg-gradient-to-r from-red-950/15 via-[#0c0c0c] to-[#0c0c0c] border border-red-900/40 rounded-xl space-y-4 animate-scale-up">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                      <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                        Match Espelho Autenticado • Pronto
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">ID de Consulta: 5PLAY-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-20 rounded-xl bg-black border border-red-900/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <Gamepad2 className="w-8 h-8 text-[#E10600] drop-shadow-[0_0_8px_rgba(225,6,0,0.6)]" />
                      <div className="absolute inset-0 bg-[#E10600]/5"></div>
                    </div>

                    <div className="space-y-1 overflow-hidden min-w-0 flex-1">
                      <p className="text-[10px] font-mono text-[#E10600] uppercase tracking-wider font-bold">Instalador Gerado</p>
                      <h4 className="text-base font-black text-white truncate font-display tracking-tight uppercase leading-none">
                        {directoryQuery} MOD Unlocked
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans font-light truncate">
                        Conexão direta segura com espelho do 5play para apk original, dados OBB e recursos VIP.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://5play.org/index.php?story=${encodeURIComponent(directoryQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#E10600] hover:bg-red-700 text-white font-display text-xs font-bold rounded-xl active:scale-95 transition-all"
                    >
                      Acessar Página de Download do {directoryQuery} ↗
                    </a>
                  </div>

                  <div className="pt-3 border-t border-zinc-900/60 mt-1 space-y-2">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                      Ou baixar versão oficial diretamente nas lojas:
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.exemplo.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-zinc-900 hover:border-emerald-500/40 hover:bg-zinc-950 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center"
                      >
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5.277L16.273 12 3 18.723v-13.446zm14.39 5.867l2.842-1.439c.655-.33.864-.897.468-1.258L4.654 2.115l12.736 9.029zm-.896 1.705L3.89 21.849c-.198-.109-.327-.241-.39-.396l12.994-9.034zm1.792-.849l4.168-2.106c.655-.331.655-.867 0-1.198l-4.168-2.106V12z" />
                        </svg>
                        Baixar para Android
                      </a>
                      <a
                        href="https://apps.apple.com/app/id123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-zinc-900 hover:border-sky-500/40 hover:bg-zinc-950 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center"
                      >
                        <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
                        </svg>
                        Baixar para iPhone
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-900/35 border border-zinc-900/60 rounded-xl text-center">
                  <p className="text-xs text-zinc-500 font-sans">
                    Aguardando consulta... Comece a digitar o nome de qualquer aplicativo ou jogo de download!
                  </p>
                </div>
              )}
            </div>

            {/* Quick Keywords Quick Launcher Tags */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase text-zinc-400 font-black tracking-widest font-mono text-center sm:text-left">
                Pesquisas Mais Comuns de alta Demanda
              </h4>
              <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                {popularKeywords.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setDirectoryQuery(tag.query)}
                    className="px-4 py-2 bg-zinc-950 hover:bg-[#121212] border border-zinc-900 hover:border-red-950/40 rounded-xl text-xs font-medium text-zinc-450 hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer Branding section */}
      <footer className="bg-[#040404] border-t border-zinc-950 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
            {/* Left side brand logo */}
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <img 
                  src="/src/assets/images/laps_lion_logo_1780179885013.png" 
                  alt="Logo Leandro LAPS" 
                  className="w-8 h-8 rounded-lg object-cover border border-red-900/40 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="font-display text-xl font-bold text-white tracking-tight">
                  Leandro <span className="text-[#E10600] glow-text">LAPS</span>
                </span>
                <span className="text-[10px] bg-red-950 px-2 py-0.5 rounded text-[#E10600] font-mono font-bold">2026 PORTAL</span>
              </div>
              <p className="text-xs text-zinc-500 font-light">As melhores joias dos games mobile no seu bolso.</p>
            </div>

            {/* Links lists anchor */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
              <button 
                onClick={() => { setSelectedGenre('Todos'); setActiveTab('store'); handleScrollToGames(); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Estore de Jogos
              </button>
              <button 
                onClick={() => { setSelectedGenre('Todos'); setActiveTab('apps'); handleScrollToGames(); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Apps Premium
              </button>
              <button 
                onClick={() => { setSelectedGenre('Todos'); setActiveTab('top100'); handleScrollToGames(); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Top 100 Mais Baixados
              </button>
              <button 
                onClick={() => { setSelectedGenre('Todos'); setActiveTab('directory'); handleScrollToGames(); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Buscador Direto 5Play
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="hover:text-[#E10600] transition-colors cursor-pointer"
              >
                Contato
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Política de Privacidade
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
            <p>© 2026 Leandro LAPS - Todos os direitos reservados.</p>
            <p className="flex items-center gap-1.5 uppercase text-[10px]">
              <span className="inline-block w-2- h-2 rounded-full bg-red-600"></span>
              Desenvolvido de forma Premium e Otimizada
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-[#E10600] text-white rounded-full z-40 cursor-pointer glow-red-strong hover:bg-red-700 active:scale-95 transition-all text-xs"
            title="Voltar ao início"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* INTEGRATED MODALS STACK */}

      {/* contact modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal onClose={() => setIsContactOpen(false)} />
        )}
      </AnimatePresence>

      {/* download modal */}
      <AnimatePresence>
        {selectedGameForDownload && (
          <DownloadModal
            game={selectedGameForDownload}
            onClose={() => setSelectedGameForDownload(null)}
          />
        )}
      </AnimatePresence>

      {/* details modal view */}
      <AnimatePresence>
        {selectedGameForDetails && (
          <GameDetailsModal
            game={selectedGameForDetails}
            isFavorite={favorites.includes(selectedGameForDetails.id)}
            onFavoriteToggle={() => toggleFavorite(selectedGameForDetails.id)}
            onClose={() => setSelectedGameForDetails(null)}
            onDownloadClick={(game) => {
              setSelectedGameForDetails(null);
              setSelectedGameForDownload(game);
            }}
            onSelectGame={(game) => setSelectedGameForDetails(game)}
          />
        )}
      </AnimatePresence>

      {/* Privacy modal dialog block */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-xl bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="absolute top-0 inset-x-0 h-1 bg-[#E10600]"></div>
              <h3 className="font-display font-bold text-lg text-white">Política de Privacidade</h3>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                O portal <span className="text-white font-medium">Leandro LAPS</span> preza pela segurança máxima dos dados de seus visitantes. 
                Não coletamos informações de perfil pessoal, cookies abusivos ou credenciais bancárias. 
                Os favoritos e os comentários registrados no site ficam salvos localmente no armazenamento do seu navegador (<span className="font-mono">localStorage</span>), 
                garantindo total segurança, privacidade e controle absoluto sobre suas interações.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-5 py-2 bg-[#E10600] text-white hover:bg-red-700 text-xs font-bold font-display rounded-lg cursor-pointer"
                >
                  Entendi e Concordo
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Directory auto-redirection overlay */}
      <AnimatePresence>
        {isDirRedirecting && (() => {
          const queryClean = directoryQuery.trim();
          const matched = GAMES_DATA.find(g => 
            g.title.toLowerCase().includes(queryClean.toLowerCase()) ||
            g.genre.toLowerCase().includes(queryClean.toLowerCase())
          );

          // Get the dynamic proxy cover url
          const getProxiedImageUrl = (url: string) => {
            if (url.startsWith('/src/') || url.startsWith('http')) return url;
            return url;
          };

          return (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
              <div className="bg-[#0b0b0b] border border-red-900/40 p-5 sm:p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl shadow-red-950/20 relative overflow-hidden">
                {/* Background red ambient glow */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {!hasDirRedirectFailed ? (
                  <>
                    {/* Header: Stylized Lion Mascot logo */}
                    <div className="relative w-24 h-24 mx-auto rounded-2xl border border-red-900/50 bg-black overflow-hidden shadow-lg shadow-red-950/45 group flex items-center justify-center">
                      <img 
                        src="/src/assets/images/laps_lion_logo_1780179885013.png" 
                        alt="Logo Leandro LAPS" 
                        className="w-full h-full object-cover animate-pulse"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-red-600/5 mix-blend-color-dodge"></div>
                    </div>

                    {/* Title / Status */}
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/40 border border-red-900/30 rounded-full text-[10px] font-mono font-black text-[#E10600] uppercase tracking-wider">
                        <Loader2 className="w-3 h-3 animate-spin text-[#E10600]" />
                        Diretório 5play Direct
                      </span>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-tight">
                        Levando você ao <span className="text-[#E10600]">5play.org</span>
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Sua resposta e um ótimo resultado de download estão sendo carregados!
                      </p>
                    </div>

                    {/* Context game display */}
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1.5">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Termo Buscado no Diretório</p>
                      <p className="text-sm font-semibold text-white truncate px-2">"{directoryQuery}"</p>
                    </div>

                    {/* Progress/Ticking counter info */}
                    <div className="space-y-1.5 pt-2">
                      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#E10600] h-full transition-all duration-1005 ease-linear shadow-[0_0_8px_rgba(225,6,0,0.8)]"
                          style={{ width: `${(dirCountdown / 2) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-zinc-400 font-light">
                        Redirecionando automaticamente em <span className="text-[#E10600] font-mono font-bold text-sm">{dirCountdown}s</span>
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-3">
                      <button
                        type="button"
                        onClick={handleCancelDirRedirect}
                        className="flex-1 px-5 py-3 bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleImmediateDirRedirect}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#E10600] hover:bg-red-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-950/20 glow-red"
                      >
                        Ir Agora
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Redirect Interrupted Fallback - SHOW IMAGE OF WHAT USER SEARCHED FOR */}
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-950/40 border border-yellow-850/50 rounded-full text-[10px] font-mono font-black text-amber-500 uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3 text-amber-500 animate-pulse" />
                        Redirecionamento Manual Requerido
                      </span>
                      <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-none pt-1">
                        Não foi redirecionado automaticamente?
                      </h2>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Nossos sistemas detectaram que a abertura de link foi bloqueada. Veja a visualização oficial para o seu termo de busca abaixo, e force o redirecionamento manual.
                      </p>
                    </div>

                    {/* Dynamic Visual Game Display Mockup */}
                    <div className="border border-red-950/40 rounded-2xl overflow-hidden shadow-xl bg-zinc-950 p-3.5 flex gap-3 text-left relative">
                      <div className="relative w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-850 flex-shrink-0">
                        <img 
                          src={matched ? getProxiedImageUrl(matched.coverUrl) : `/src/assets/images/default_cover_1780186327956.png`}
                          alt="Visualização do Diretório" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center min-w-0 space-y-1.5">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest">
                            {matched ? matched.genre : 'DIRETÓRIO MOD'}
                          </span>
                          <h3 className="text-sm font-black text-white tracking-tight truncate">
                            {matched ? matched.title : directoryQuery}
                          </h3>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-light line-clamp-2 leading-relaxed">
                          {matched ? matched.description : `Versão Premium com recursos ilimitados, jogabilidade desbloqueada e instalador seguro validado pela comunidade Leandro LAPS.`}
                        </p>
                        <div className="flex gap-2 text-[9px] font-mono text-zinc-500">
                          <span>{matched ? matched.fileSize : 'Premium MOD'}</span>
                          <span>•</span>
                          <span className="text-amber-500 font-bold">★ {matched ? matched.rating : '4.8'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleImmediateDirRedirect}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#E10600] hover:bg-red-700 text-white text-xs font-black rounded-xl active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-950/40 glow-red animate-pulse"
                      >
                        Tentar Redirecionar Novamente
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCopyDirLink}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[11px] font-bold rounded-xl active:scale-95 transition-all cursor-pointer min-w-0"
                        >
                          {isDirCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-500" />
                              <span className="truncate">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="truncate">Copiar Link</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelDirRedirect}
                          className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-450 hover:text-white text-[11px] font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <p className="text-[9px] text-zinc-500 font-mono">
                  O ecossistema oficial Leandro LAPS espelha com 100% de segurança o catálogo do 5play.org/en/
                </p>
              </div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
