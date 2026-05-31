/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Game } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Sparkles, Award, Loader2, Share2, Send, MessageCircle, Twitter } from 'lucide-react';
import { getProxiedImageUrl } from '../utils/imageProxy';

interface GameCardProps {
  key?: string;
  game: Game;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onDownloadClick?: (game: Game) => void;
  onDetailsClick?: (game: Game) => void;
}

export default function GameCard({ game }: GameCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const url = game.dlUrlAndroid && game.dlUrlAndroid !== '#' 
      ? game.dlUrlAndroid 
      : `https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`;

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 1200); // Premium visual feedback delay
  };

  const shareText = `Olha esse MOD desbloqueado incrivel para ${game.title} no Portal LAPS! 🔥`;
  const shareUrl = game.dlUrlAndroid && game.dlUrlAndroid !== '#'
    ? game.dlUrlAndroid
    : window.location.href;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseLeave={() => setShowShareMenu(false)}
      className={`relative group bg-zinc-950/80 border ${
        game.isRare 
          ? 'border-amber-500/20 hover:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
          : 'border-zinc-900 hover:border-[#E10600] shadow-inner'
      } ${game.isRare ? 'shimmer-effect' : ''} rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[2/3] transition-all duration-500 transform-gpu cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(225,6,0,0.25)] ${
        isLoading ? 'pointer-events-none scale-[0.98]' : ''
      }`}
      onClick={handleRedirect}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center space-y-4"
          >
            {/* Elegant glowing spinner */}
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#E10600] animate-spin z-10" />
              <div className="absolute w-12 h-12 bg-red-600/35 rounded-full blur-xl animate-pulse"></div>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-mono font-black text-red-500 tracking-widest bg-red-950/40 border border-red-900/30 px-1.5 py-0.5 rounded uppercase">
                Laps Link
              </span>
              <p className="text-xs font-semibold text-white tracking-wide">
                Buscando Mod...
              </p>
              <p className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">
                Redirecionando
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 100% Full-bleed Cover/Image Canvas */}
      {!imgFailed ? (
        <img
          src={getProxiedImageUrl(game.coverUrl)}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
        />
      ) : (
        /* Stunning fallback poster template if official cover fails to resolve */
        <div className="w-full h-full relative overflow-hidden bg-zinc-950 flex flex-col justify-between p-4">
          <img
            src="/src/assets/images/default_cover_1780186327956.png"
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover opacity-45 filter brightness-[0.45] scale-102 group-hover:scale-110 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex justify-between items-start relative z-10 select-none">
            <span className="text-[9px] font-mono font-black text-red-500 tracking-widest bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded-md">
              PORTAL LAPS
            </span>
            <span className="text-[9px] font-mono text-zinc-500">{game.fileSize}</span>
          </div>

          <div className="space-y-2 relative z-10 select-none">
            <p className="text-[10px] uppercase tracking-widest font-mono text-[#E10600] font-black">{game.category}</p>
            <h3 className="font-display font-black text-base sm:text-lg text-white leading-tight uppercase">
              {game.title}
            </h3>
          </div>
        </div>
      )}

      {/* Modern floating action layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"></div>

      {/* Rare status badge at top-left corner */}
      {game.isRare && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 border border-amber-400/30 text-black font-display text-[9px] font-black uppercase tracking-wider rounded-md shadow-lg">
          <Award className="w-3 h-3 fill-black animate-pulse" />
          <span>{game.rareBadgeText || 'Raro'}</span>
        </div>
      )}

      {/* Floating Sparkles indicator for normal items in design spacing */}
      {!game.isRare && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-zinc-800/60 text-[#E10600] font-mono text-[8px] font-bold uppercase tracking-widest rounded">
          <Sparkles className="w-2 h-2" />
          <span>Destaque</span>
        </div>
      )}

      {/* Floating social share widget at top-right corner */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareMenu(!showShareMenu);
          }}
          className={`p-1.5 rounded-lg backdrop-blur-md border text-zinc-400 hover:text-white transition-all duration-300 ${
            showShareMenu 
              ? 'bg-[#E10600] border-[#E10600] text-white shadow-[0_0_8px_rgba(225,6,0,0.5)]' 
              : 'bg-black/60 border-zinc-800/60 hover:bg-zinc-900/80 hover:border-zinc-700/80'
          }`}
          title="Compartilhar MOD"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -5 }}
              transition={{ duration: 0.15 }}
              className="bg-black/95 backdrop-blur-md border border-zinc-800 p-1.5 rounded-xl flex flex-col gap-1 shadow-xl shadow-black/80 w-24"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 px-1.5 rounded hover:bg-emerald-600/20 text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 text-[9px] font-mono leading-none transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 px-1.5 rounded hover:bg-sky-600/20 text-zinc-300 hover:text-sky-450 flex items-center gap-1.5 text-[9px] font-mono leading-none transition-colors"
                title="Compartilhar no Telegram"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 px-1.5 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1.5 text-[9px] font-mono leading-none transition-colors"
                title="Compartilhar no Twitter (X)"
              >
                <Twitter className="w-3.5 h-3.5 text-blue-400" />
                <span>X / Twitter</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sleek bottom overlay for title and immediate redirect visual cue */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-12 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{game.category} • {game.fileSize}</span>
        
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display font-medium text-xs sm:text-sm text-white group-hover:text-[#E10600] transition-colors leading-tight truncate flex-1">
            {game.title}
          </h3>
          <div className="w-6 h-6 rounded-full bg-[#E10600] border border-red-500/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
