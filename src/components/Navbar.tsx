/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, Mail, Sparkles, Award, Trash2, ExternalLink, Loader2, Store, Smartphone, Trophy, Compass, Menu, X, AlertTriangle, Copy, Check } from 'lucide-react';
import { Game } from '../types';
import { getProxiedImageUrl } from '../utils/imageProxy';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  allGames: Game[];
  onOpenContact: () => void;
  onOpenGameDetails: (game: Game) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  favorites,
  toggleFavorite,
  allGames,
  onOpenContact,
  onOpenGameDetails,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const [showFavList, setShowFavList] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [hasRedirectFailed, setHasRedirectFailed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const failTimerRef = useRef<NodeJS.Timeout | null>(null);

  const favoritedGames = allGames.filter(g => favorites.includes(g.id));

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (failTimerRef.current) clearTimeout(failTimerRef.current);
    };
  }, []);

  // Monitor searchQuery for typing pauses to trigger auto-redirect
  useEffect(() => {
    // If query is empty or too short, don't trigger anything
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsRedirecting(false);
      setHasRedirectFailed(false);
      return;
    }

    // Clear any pending triggers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (failTimerRef.current) clearTimeout(failTimerRef.current);

    // Reset redirect state to false when typing is active so we don't flash outdated screens
    setIsRedirecting(false);
    setHasRedirectFailed(false);

    // Set a debounce timer
    timerRef.current = setTimeout(() => {
      // User stopped typing! Start the redirection sequence
      setIsRedirecting(true);
      setHasRedirectFailed(false);
      setCountdown(2);

      // Start the actual ticking countdown
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Reached zero! Redirect
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(searchQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
            
            try {
              window.location.href = targetUrl;
            } catch (err) {
              console.error("Redirection attempt failed", err);
            }

            // Set failure timeout if still present after 1.8 seconds (meaning browser translation did not unmount this tab, highly likely in preview iframe sandbox)
            if (failTimerRef.current) clearTimeout(failTimerRef.current);
            failTimerRef.current = setTimeout(() => {
              setHasRedirectFailed(true);
            }, 1800);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 900); // 900ms pause of typing

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  const handleCancelRedirect = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failTimerRef.current) clearTimeout(failTimerRef.current);
    setIsRedirecting(false);
    setHasRedirectFailed(false);
    setSearchQuery('');
  };

  const handleImmediateRedirect = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failTimerRef.current) clearTimeout(failTimerRef.current);
    const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(searchQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
    
    try {
      window.location.href = targetUrl;
    } catch (err) {
      console.error("Action redirection failed", err);
    }

    // Immediately trigger a safety check so that they see the card if it fails or gets blocked
    failTimerRef.current = setTimeout(() => {
      setHasRedirectFailed(true);
    }, 1200);
  };

  const handleCopyLink = () => {
    const targetUrl = `https://5play.org/index.php?story=${encodeURIComponent(searchQuery.trim())}&lang=en&do=search&subaction=search&titleonly=0`;
    navigator.clipboard.writeText(targetUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleImmediateRedirect();
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-red-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('all');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-11 h-11 bg-black rounded-xl border border-red-900/40 group-hover:border-red-600 transition-all duration-300 overflow-hidden flex items-center justify-center shadow-lg shadow-red-950/30">
              <img 
                src="/src/assets/images/laps_lion_logo_1780179885013.png" 
                alt="Logo Leandro LAPS" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -inset-1 rounded-xl bg-[#E10600]/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                Leandro <span className="text-[#E10600] glow-text">LAPS</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase -mt-1">
                Aprimorando sua jogabilidade
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => { setActiveTab('store'); setSearchQuery(''); }}
              className={`text-xs uppercase font-bebas tracking-widest px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'store' ? 'text-white bg-[#E10600]/10 border border-[#E10600]/30 shadow-[0_0_8px_rgba(225,6,0,0.15)] font-black' : 'text-zinc-400 hover:text-white border border-transparent shadow-none'}`}
            >
              <Store className="w-4 h-4 text-[#E10600]" />
              Estore de Jogos
            </button>
            
            <button
              onClick={() => { setActiveTab('apps'); setSearchQuery(''); }}
              className={`text-xs uppercase font-bebas tracking-widest px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'apps' ? 'text-white bg-[#E10600]/10 border border-[#E10600]/30 shadow-[0_0_8px_rgba(225,6,0,0.15)] font-black' : 'text-zinc-400 hover:text-white border border-transparent shadow-none'}`}
            >
              <Smartphone className="w-4 h-4 text-[#E10600]" />
              Apps Premium
            </button>
            
            <button
              onClick={() => { setActiveTab('top100'); setSearchQuery(''); }}
              className={`text-xs uppercase font-bebas tracking-widest px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'top100' ? 'text-white bg-[#E10600]/10 border border-[#E10600]/30 shadow-[0_0_8px_rgba(225,6,0,0.15)] font-black' : 'text-zinc-400 hover:text-white border border-transparent shadow-none'}`}
            >
              <Trophy className="w-4 h-4 text-[#E10600]" />
              Top 100 Baixados
            </button>

            <button
              onClick={() => { setActiveTab('directory'); setSearchQuery(''); }}
              className={`text-xs uppercase font-bebas tracking-widest px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'directory' ? 'text-white bg-[#E10600]/10 border border-[#E10600]/30 shadow-[0_0_8px_rgba(225,6,0,0.15)] font-black' : 'text-zinc-400 hover:text-white border border-transparent shadow-none'}`}
            >
              <Compass className="w-4 h-4 text-[#E10600]" />
              Buscador Direto 5Play
            </button>
            
            <button
              onClick={onOpenContact}
              className="text-xs uppercase font-bebas tracking-widest px-3 py-2 rounded-lg text-zinc-400 hover:text-[#E10600] flex items-center gap-1.5 border border-transparent hover:border-red-950/20 active:scale-95 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contato
            </button>
          </div>

          {/* Search Bar & Favorites */}
          <div className="flex items-center space-x-4">
            
            {/* Search Input */}
            <form onSubmit={handleSubmitSearch} className="relative w-44 sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Pesquisar jogo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-full text-xs sm:text-sm focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/30 transition-all placeholder:text-zinc-600"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleCancelRedirect}
                  className="absolute right-3 top-2 text-zinc-500 hover:text-zinc-300 text-xs font-semibold"
                >
                  Limpar
                </button>
              )}
            </form>

            {/* Favorites Icon */}
            <div className="relative">
              <button
                onClick={() => setShowFavList(!showFavList)}
                className="relative p-2 bg-[#121212] border border-zinc-800 rounded-full hover:border-red-600/50 hover:bg-red-950/20 text-zinc-400 hover:text-[#E10600] transition-all"
                title="Meus Favoritos"
                id="favorites-nav-button"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-[#E10600] text-[#E10600]' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#E10600] font-mono text-[9px] font-bold text-white shadow-[0_0_8px_rgba(225,6,0,0.6)]">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Favorites Dropdown List */}
              {showFavList && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0e0e0e] border border-zinc-800 rounded-xl shadow-2xl p-4 z-50 animate-fade-in divide-y divide-zinc-900">
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#E10600]" />
                      Meus Favoritos
                    </h3>
                    <span className="text-[10px] bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded-full text-zinc-400 font-mono">
                      {favoritedGames.length} {favoritedGames.length === 1 ? 'jogo' : 'jogos'}
                    </span>
                  </div>

                  {favoritedGames.length === 0 ? (
                    <div className="py-6 text-center">
                      <p className="text-zinc-500 text-xs">Nenhum jogo favoritado ainda.</p>
                      <p className="text-[#E10600] text-[10px] mt-1 font-medium">Toque no ícone de coração nos cards!</p>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto pt-2 space-y-2.5">
                      {favoritedGames.map(game => (
                        <div key={game.id} className="flex items-center justify-between gap-2.5 p-2 rounded-lg hover:bg-[#141414] transition-colors group">
                          <div 
                            className="flex items-center gap-2.5 cursor-pointer flex-1 overflow-hidden"
                            onClick={() => {
                              onOpenGameDetails(game);
                              setShowFavList(false);
                            }}
                          >
                            <img 
                              src={getProxiedImageUrl(game.coverUrl)} 
                              alt={game.title} 
                              className="w-10 h-12 object-cover rounded bg-zinc-900 border border-zinc-850"
                              referrerPolicy="no-referrer"
                            />
                            <div className="overflow-hidden">
                              <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#E10600] transition-colors">
                                {game.title}
                              </h4>
                              <p className="text-[10px] text-zinc-500 truncate">{game.category}</p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => toggleFavorite(game.id)}
                            className="text-zinc-600 hover:text-red-500 p-1.5"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Redirection Countdown Overlay Screen */}
      {isRedirecting && (() => {
        const queryClean = searchQuery.trim();
        const matched = allGames.find(g => 
          g.title.toLowerCase().includes(queryClean.toLowerCase()) ||
          g.genre.toLowerCase().includes(queryClean.toLowerCase())
        );

        return (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
            <div className="bg-[#0b0b0b] border border-red-900/40 p-5 sm:p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl shadow-red-950/20 relative overflow-hidden">
              {/* Background red ambient glow */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {!hasRedirectFailed ? (
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
                      Espelhamento Inteligente LAPS
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
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Termo Buscado</p>
                    <p className="text-sm font-semibold text-white truncate px-2">"{searchQuery}"</p>
                  </div>

                  {/* Progress/Ticking counter info */}
                  <div className="space-y-1.5 pt-2">
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#E10600] h-full transition-all duration-1005 ease-linear shadow-[0_0_8px_rgba(225,6,0,0.8)]"
                        style={{ width: `${(countdown / 2) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light">
                      Redirecionamento automático e seguro em <span className="text-[#E10600] font-mono font-bold text-sm">{countdown}s</span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleCancelRedirect}
                      className="flex-1 px-5 py-3 bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleImmediateRedirect}
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
                      Redirecionamento Manual Necessário
                    </span>
                    <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-none pt-1">
                      Não foi possível ir automático?
                    </h2>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      O portal localizou o melhor mod correspondente para a sua busca. Clique abaixo em <span className="text-[#E10600] font-semibold">Tentar Direcionar</span> para abrir o link de download direto no 5play.
                    </p>
                  </div>

                  {/* Dynamic Visual Game Display Mockup */}
                  <div className="border border-red-950/40 rounded-2xl overflow-hidden shadow-xl bg-zinc-950 p-3.5 flex gap-3 text-left relative">
                    <div className="relative w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-850 flex-shrink-0">
                      <img 
                        src={matched ? getProxiedImageUrl(matched.coverUrl) : `/src/assets/images/default_cover_1780186327956.png`}
                        alt="Visualização do Mod" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0 space-y-1.5">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest">
                          {matched ? matched.genre : 'RESULTADO DIRETO'}
                        </span>
                        <h3 className="text-sm font-black text-white tracking-tight truncate">
                          {matched ? matched.title : searchQuery}
                        </h3>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-light line-clamp-2 leading-relaxed">
                        {matched ? matched.description : `Versão Modificada Premium com recursos ilimitados, dinheiro infinito e compatibilidade aprimorada pela curadoria LAPS.`}
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
                      onClick={handleImmediateRedirect}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#E10600] hover:bg-red-700 text-white text-xs font-black rounded-xl active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-950/40 glow-red animate-pulse"
                    >
                      Tentar Redirecionar Novamente
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[11px] font-bold rounded-xl active:scale-95 transition-all cursor-pointer min-w-0"
                      >
                        {isCopied ? (
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
                        onClick={handleCancelRedirect}
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

      {/* Mobile Fast Navigation Sub-Bar */}
      <div className="flex lg:hidden border-t border-zinc-900/40 bg-[#070707]/95 justify-around py-2.5 px-2">
        <button
          onClick={() => { setActiveTab('store'); setSearchQuery(''); }}
          className={`flex flex-col items-center gap-1.5 text-[9px] uppercase font-bebas tracking-wider active:scale-95 transition-all cursor-pointer ${activeTab === 'store' ? 'text-[#E10600]' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Store className="w-4 h-4" />
          Store de Jogos
        </button>
        <button
          onClick={() => { setActiveTab('apps'); setSearchQuery(''); }}
          className={`flex flex-col items-center gap-1.5 text-[9px] uppercase font-bebas tracking-wider active:scale-95 transition-all cursor-pointer ${activeTab === 'apps' ? 'text-[#E10600]' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Smartphone className="w-4 h-4" />
          Apps Premium
        </button>
        <button
          onClick={() => { setActiveTab('top100'); setSearchQuery(''); }}
          className={`flex flex-col items-center gap-1.5 text-[9px] uppercase font-bebas tracking-wider active:scale-95 transition-all cursor-pointer ${activeTab === 'top100' ? 'text-[#E10600]' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Trophy className="w-4 h-4" />
          Top 100
        </button>
        <button
          onClick={() => { setActiveTab('directory'); setSearchQuery(''); }}
          className={`flex flex-col items-center gap-1.5 text-[9px] uppercase font-bebas tracking-wider active:scale-95 transition-all cursor-pointer ${activeTab === 'directory' ? 'text-[#E10600]' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Compass className="w-4 h-4" />
          Buscador 5Play
        </button>
      </div>
    </nav>
  );
}
