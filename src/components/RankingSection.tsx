/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Download, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';
import { Game } from '../types';
import { getProxiedImageUrl } from '../utils/imageProxy';

interface RankingSectionProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onDownloadClick: (game: Game) => void;
}

export default function RankingSection({ games, onSelectGame, onDownloadClick }: RankingSectionProps) {
  // Sort games by downloadsCount descending
  const sortedGames = [...games].sort((a, b) => b.downloadsCount - a.downloadsCount).slice(0, 5);

  const formatDownloads = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return (num / 1000).toFixed(0) + 'K';
  };

  return (
    <div className="bg-[#0b0b0b] border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-950/40 border border-red-900/35 rounded-xl text-[#E10600]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">Ranking Semanal</h3>
            <p className="text-xs text-zinc-500">Os jogos mobile mais baixados na última semana.</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-full uppercase">
          Filtro: Geral 2026
        </span>
      </div>

      {/* Ranking List */}
      <div className="divide-y divide-zinc-900/60 space-y-3 pt-2">
        {sortedGames.map((game, idx) => {
          const rank = idx + 1;
          
          // Rank dynamic colors
          let badgeColor = "bg-zinc-900 text-zinc-400 border-zinc-800";
          if (rank === 1) badgeColor = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
          if (rank === 2) badgeColor = "bg-slate-300/10 text-slate-300 border-slate-300/20";
          if (rank === 3) badgeColor = "bg-amber-700/15 text-amber-600 border-amber-700/20";

          return (
            <div 
              key={game.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#111] transition-all group cursor-pointer"
              onClick={() => onSelectGame(game)}
            >
              
              {/* Left Column: Trophy Rank & Game Icon & Text */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Ranking Position indicator badge */}
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center font-bebas font-bold border text-lg tracking-wide flex-shrink-0 ${badgeColor}`}>
                  {rank === 1 ? <Award className="w-4.5 h-4.5 fill-yellow-500 text-yellow-500" /> : rank}
                </div>

                <img 
                  src={getProxiedImageUrl(game.coverUrl)} 
                  alt={game.title} 
                  className="w-12 h-14 object-cover rounded-lg border border-zinc-850 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base text-white group-hover:text-[#E10600] transition-colors truncate">
                    {game.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{game.category}</span>
                    <span className="text-zinc-800 text-xs">•</span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-850 flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      {game.platforms.join(' / ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Downloads Count and Download Button */}
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-zinc-900 pt-2.5 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-zinc-500 font-sans uppercase tracking-widest leading-none">Downloads semanais</p>
                  <p className="text-lg font-bold text-white font-bebas tracking-wider flex items-center gap-1.5 sm:justify-end mt-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(225,6,0,0.8)]"></span>
                    {formatDownloads(game.downloadsCount)}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadClick(game);
                  }}
                  className="p-2 sm:p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-[#E10600] group-hover:border-red-600 rounded-lg transition-all"
                  title="Baixar Jogo"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
