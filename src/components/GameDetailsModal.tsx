/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Star, Download, Smartphone, Calendar, HardDrive, Gamepad, BadgePercent, CheckCircle, Info } from 'lucide-react';
import { Game } from '../types';
import ReviewsSection from './ReviewsSection';
import { getProxiedImageUrl } from '../utils/imageProxy';
import { GAMES_DATA } from '../gamesData';

interface GameDetailsModalProps {
  game: Game;
  onClose: () => void;
  onDownloadClick: (game: Game) => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onSelectGame?: (game: Game) => void;
}

export default function GameDetailsModal({
  game,
  onClose,
  onDownloadClick,
  isFavorite,
  onFavoriteToggle,
  onSelectGame
}: GameDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reviews'>('info');

  useEffect(() => {
    setActiveTab('info');
  }, [game.id]);

  // Compute exactly 3 suggested games from the same genre
  const suggestions = (() => {
    const sameGenre = GAMES_DATA.filter(
      g => g.genre?.toLowerCase() === game.genre?.toLowerCase() && g.id !== game.id
    );
    if (sameGenre.length >= 3) {
      return sameGenre.slice(0, 3);
    }
    const otherGames = GAMES_DATA.filter(
      g => g.id !== game.id && !sameGenre.some(sg => sg.id === g.id)
    );
    return [...sameGenre, ...otherGames].slice(0, 3);
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      {/* Absolute background blur dismiss click */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-zinc-855 rounded-2xl overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Glowing top line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#E10600] glow-red"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 border border-zinc-900 rounded-full text-zinc-400 hover:text-white hover:border-[#E10600] transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Immersive Hero Header (Game banner layout) */}
        <div className="relative h-64 sm:h-80 bg-black overflow-hidden">
          <img 
            src={getProxiedImageUrl(game.coverUrl)} 
            alt={game.title}
            className="w-full h-full object-cover filter brightness-[0.7] blur-[2px] scale-102"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/src/assets/images/default_cover_1780186327956.png";
            }}
          />
          {/* Centered true aspect hero overlay graphic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-black/60"></div>

          {/* Banner content */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-end gap-6 z-10">
            {/* Aspect card cover thumbnail */}
            <img 
              src={getProxiedImageUrl(game.coverUrl)} 
              alt={game.title}
              className="hidden sm:block w-32 h-40 object-cover rounded-xl border border-zinc-800 shadow-2xl relative -mb-12 bg-black"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/src/assets/images/default_cover_1780186327956.png";
              }}
            />
            
            <div className="space-y-2.5 flex-1 select-none">
              <div className="flex flex-wrap gap-2.5">
                <span className="text-[10px] font-mono bg-red-950/80 border border-red-900/40 text-[#E10600] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  {game.category}
                </span>
                {game.isRare && (
                  <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                    EXCLUSIVO LAPS RARO
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight drop-shadow-md">
                {game.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-300">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-white">{game.rating}</span>
                  <span className="text-zinc-500 font-mono">/ 5.0</span>
                </div>
                <span className="text-zinc-700">•</span>
                <span className="flex items-center gap-1 font-mono text-zinc-400">
                  <HardDrive className="w-3.5 h-3.5 text-[#E10600]" />
                  {game.fileSize}
                </span>
                <span className="text-zinc-700">•</span>
                <span className="flex items-center gap-1 font-mono text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-[#E10600]" />
                  {game.releaseYear}
                </span>
              </div>
            </div>

            {/* Quick Actions at header corner */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => onDownloadClick(game)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E10600] hover:bg-red-700 text-white font-display text-xs font-bold rounded-xl cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(225,6,0,0.45)] transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar Agora
              </button>
              <a
                href={`https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900/95 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl text-xs font-bold transition-all"
              >
                Espelho 5play.org
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs bar */}
        <div className="flex border-b border-zinc-900 bg-[#0c0c0c] px-6 pt-16 sm:pt-6 select-none">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'info' 
                ? 'border-[#E10600] text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-200'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'specs' 
                ? 'border-[#E10600] text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-200'
            }`}
          >
            Requisitos do Sistema
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'reviews' 
                ? 'border-[#E10600] text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-200'
            }`}
          >
            Comentários
          </button>
        </div>

        {/* Tabs Content dynamic screens */}
        <div className="p-6 sm:p-8 max-h-[420px] overflow-y-auto">
          
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-display font-bold text-base text-white">Sobre o Jogo</h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {game.description}
                </p>
              </div>

              {/* Special tags elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Destaques da Build LAPS</h4>
                  <ul className="space-y-1.5 font-sans text-xs text-zinc-450 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      Sem anúncios invasivos ou popups chatos.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      Compatível com gamepads bluetooth no celular.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      Verificado contra spywares e malwares.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#111] border border-zinc-900 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-emerald-500 animate-pulse" />
                      Espelho Oficial 5play.org
                    </p>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed mt-1">
                      Este jogo está totalmente espelhado com o catálogo seguro de <a href="https://5play.org/en/" target="_blank" rel="noopener noreferrer" className="text-[#E10600] font-semibold hover:underline">5play.org/en/</a> para facilitar os seus downloads.
                    </p>
                  </div>
                  <a
                    href={`https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E10600] hover:underline pt-1"
                  >
                    Verificar no 5play.org ↗
                  </a>
                </div>
              </div>

              {/* Official Store Downloads integration bar */}
              <div className="pt-4 border-t border-zinc-900/60 mt-4 space-y-2.5">
                <p className="text-xs font-semibold text-white">Versões Originais das Lojas Oficiais:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.exemplo.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-emerald-500/40 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
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
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-sky-500/40 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
                    </svg>
                    Baixar para iPhone
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FICHA TÉCNICA REQUISITOS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h4 className="font-display font-bold text-base text-white">Compatibilidade Geral</h4>
              <p className="text-xs text-zinc-400">Verifique as especificações mínimas necessárias para rodar o game com taxas de quadro estáveis.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                <div className="bg-[#111] border border-zinc-900/60 p-4 rounded-xl space-y-1">
                  <Smartphone className="w-5 h-5 text-[#E10600] mb-2" />
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Android Mínimo</p>
                  <p className="text-xs font-semibold text-white">{game.specifications.androidMin}</p>
                </div>

                <div className="bg-[#111] border border-zinc-900/60 p-4 rounded-xl space-y-1">
                  <Smartphone className="w-5 h-5 text-sky-400 mb-2" />
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">iOS Mínimo</p>
                  <p className="text-xs font-semibold text-white">{game.specifications.iosMin}</p>
                </div>

                <div className="bg-[#111] border border-zinc-900/60 p-4 rounded-xl space-y-1">
                  <Gamepad className="w-5 h-5 text-[#E10600] mb-2" />
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Memória RAM Recomendada</p>
                  <p className="text-xs font-semibold text-white">{game.specifications.ramMin}</p>
                </div>

              </div>

              {/* Direct file properties lists */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-zinc-900">
                    <tr className="py-2.5 flex justify-between">
                      <td className="text-zinc-500 font-mono">Desenvolvedor Original</td>
                      <td className="text-zinc-300 font-medium">Estúdio Global / Comunidade Indie</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="text-zinc-500 font-mono">Assinatura do arquivo LAPS</td>
                      <td className="text-emerald-500 font-semibold font-mono">V2_SECURE_SIGNED</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="text-zinc-500 font-mono">Data do Envio</td>
                      <td className="text-zinc-300 font-medium">Maio de 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COMENTÁRIOS DA COMUNIDADE */}
          {activeTab === 'reviews' && (
            <ReviewsSection game={game} />
          )}

        </div>

        {/* Sugestões para Você Section */}
        <div className="p-6 sm:px-8 sm:pb-8 bg-[#070707] border-t border-zinc-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#E10600] rounded-full"></div>
              <h3 className="font-display font-black text-sm tracking-wider uppercase text-white">
                Sugestões para Você
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Gênero: {game.genre}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((sGame) => (
              <div
                key={sGame.id}
                onClick={() => onSelectGame?.(sGame)}
                className="group relative flex items-center gap-3 p-3 bg-zinc-950/45 border border-zinc-900 hover:border-[#E10600]/40 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-950"
              >
                <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-zinc-900 flex-shrink-0 bg-zinc-900">
                  <img
                    src={getProxiedImageUrl(sGame.coverUrl)}
                    alt={sGame.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/src/assets/images/default_cover_1780186327956.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-black text-zinc-200 group-hover:text-[#E10600] transition-colors truncate">
                    {sGame.title}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-500 truncate">
                    {sGame.fileSize} • {sGame.category}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-zinc-300">{sGame.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
