/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, ShieldCheck, Cpu, Sparkles, Download, Smartphone } from 'lucide-react';
import GameSlider from './GameSlider';
import { GAMES_DATA } from '../gamesData';

const featuredGames = GAMES_DATA.slice(0, 3);

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-black py-16 sm:py-24 border-b border-red-950/20">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#140505_1px,transparent_1px),linear-gradient(to_bottom,#140505_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80"></div>
      
      {/* Ambient Red Glow Lights */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute left-[-5%] bottom-[10%] w-[400px] h-[400px] bg-red-950/25 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tagline & Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/45 border border-red-900/40 text-[#E10600] rounded-full text-xs font-bebas tracking-widest text-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              PORTAL EXCLUSIVO DE GAMES DE 2026
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Descubra os melhores <br className="hidden sm:block" />
              jogos mobile de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-white glow-text">2026</span> em um só lugar.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 font-light">
              Bem-vindo ao <span className="text-white font-medium">Leandro LAPS</span>. 
              Sua fonte de download facilitado com catálogo 100% espelhado diretamente do diretório parceiro <a href="https://5play.org/en/" target="_blank" rel="noopener noreferrer" className="text-[#E10600] font-semibold hover:underline">5play.org/en/</a>. APKs originais, remakes e ports remasterizados com velocidade máxima.
            </p>

            {/* Checkmark Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start px-2 py-1.5 bg-[#121212]/40 rounded-lg border border-zinc-900">
                <ShieldCheck className="w-4.5 h-4.5 text-[#E10600]" />
                <span className="text-xs text-zinc-300 font-medium">100% Verificado</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start px-2 py-1.5 bg-[#121212]/40 rounded-lg border border-zinc-900">
                <Cpu className="w-4.5 h-4.5 text-[#E10600]" />
                <span className="text-xs text-zinc-300 font-medium">Max Performance</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start px-2 py-1.5 bg-[#121212]/40 rounded-lg border border-zinc-900">
                <Smartphone className="w-4.5 h-4.5 text-[#E10600]" />
                <span className="text-xs text-zinc-300 font-medium">Android & iOS Ports</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E10600] text-white font-display font-medium rounded-xl hover:bg-red-700 transition-all duration-300 active:scale-95 cursor-pointer glow-red-strong border border-red-500/20 shadow-[0_0_20px_rgba(225,6,0,0.4)]"
                id="cta-explore-games"
              >
                <Play className="w-5 h-5 fill-white" />
                Explorar Jogos
              </button>
              
              <a
                href="#rare-section"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-90 w-full sm:w-auto text-zinc-300 font-display font-medium rounded-xl hover:bg-zinc-900/80 hover:text-white border border-zinc-900 hover:border-red-950/55 transition-all duration-300"
              >
                Ver Jogos Raros
              </a>
            </div>

            {/* Quick Portal Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-zinc-900 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-3xl sm:text-4xl font-bebas text-white glow-text tracking-wider leading-none">50+</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans mt-1">Catálogo Curado</p>
              </div>
              <div className="h-8 border-r border-zinc-900"></div>
              <div>
                <p className="text-3xl sm:text-4xl font-bebas text-white glow-text tracking-wider leading-none">145K+</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans mt-1">Downloads Feitos</p>
              </div>
              <div className="h-8 border-r border-zinc-900"></div>
              <div>
                <p className="text-3xl sm:text-4xl font-bebas text-[#E10600] glow-text tracking-wider leading-none">100%</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans mt-1">Seguro & Livre</p>
              </div>
            </div>
          </div>

          {/* Right Floating Widescreen Graphic */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="w-full relative group p-1.5 bg-gradient-to-b from-[#1c1c1c] via-[#101010] to-[#040404] rounded-2xl border border-red-900/30 glow-red aspect-[4/3] lg:aspect-[4/3] xl:aspect-[16/9]">
              
              {/* Outer decorative line corners */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#E10600]"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#E10600]"></div>

              <GameSlider games={featuredGames} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
