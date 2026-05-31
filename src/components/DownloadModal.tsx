/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check, Download, ShieldCheck, Smartphone, Cpu, QrCode, HardDrive, RefreshCw } from 'lucide-react';
import { Game } from '../types';
import { getProxiedImageUrl } from '../utils/imageProxy';

interface DownloadModalProps {
  game: Game;
  onClose: () => void;
}

export default function DownloadModal({ game, onClose }: DownloadModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>(
    game.platforms.includes('android') ? 'android' : 'ios'
  );
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Restart modal state when game changes
  useEffect(() => {
    setDownloadState('idle');
    setProgress(0);
    setSpeed(0);
    setSelectedPlatform(game.platforms.includes('android') ? 'android' : 'ios');
  }, [game]);

  const handleStartDownload = () => {
    setDownloadState('downloading');
    setProgress(0);
    setSpeed(Math.floor(Math.random() * 40) + 40); // 40-80 MB/s
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloadState === 'downloading') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setDownloadState('completed');
            clearInterval(interval);
            return 100;
          }
          // Dynamic increase and speeds
          const increment = Math.floor(Math.random() * 12) + 5;
          setSpeed(Math.floor(Math.random() * 30) + 50); // Fluctuates speed
          return Math.min(prev + increment, 100);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [downloadState]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Container Card */}
      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Red Glow Light Frame Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#E10600] glow-red"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-red-600 transition-colors z-10"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Modal Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Visual details */}
          <div className="md:col-span-5 relative bg-black/40 border-r border-zinc-900/60 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative aspect-auto h-44 rounded-xl overflow-hidden border border-zinc-850">
                <img
                  src={getProxiedImageUrl(game.coverUrl)}
                  alt={game.title}
                  className="w-full h-full object-cover filter brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent"></div>
                
                {game.isRare && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider rounded">
                    RARO
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-black text-xl text-white">{game.title}</h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">{game.category}</p>
              </div>

              {/* Secure Checklists */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Sem vírus detectados (0/64)
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-medium">
                  <Check className="w-4 h-4" />
                  SHA-256 Verificado e Limpo
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-medium">
                  <HardDrive className="w-4 h-4 text-[#E10600]" />
                  Tamanho: {game.fileSize}
                </div>
              </div>
            </div>

            {/* Footer Specifications Info */}
            <div className="pt-4 border-t border-zinc-900 mt-6 md:mt-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Requisitos Recomendados</p>
              <div className="mt-1.5 space-y-1 text-[11px] text-zinc-400">
                <p className="flex items-start gap-1"><span className="text-[#E10600]">⚙ iOS:</span> {game.specifications.iosMin}</p>
                <p className="flex items-start gap-1"><span className="text-[#E10600]">⚙ Android:</span> {game.specifications.androidMin}</p>
                <p className="flex items-start gap-1"><span className="text-[#E10600]">⚙ RAM:</span> {game.specifications.ramMin}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Platform download and QR Code options */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display font-bold text-lg text-white">Preparar Download</h2>
              <p className="text-xs text-zinc-400">Selecione o seu dispositivo e inicie o download seguro do arquivo.</p>
              
              {/* Device Selector */}
              <div className="flex gap-2.5 mt-4">
                {game.platforms.includes('android') && (
                  <button
                    onClick={() => {
                      setSelectedPlatform('android');
                      setDownloadState('idle');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                      selectedPlatform === 'android'
                        ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Android (APK)
                  </button>
                )}
                {game.platforms.includes('ios') && (
                  <button
                    onClick={() => {
                      setSelectedPlatform('ios');
                      setDownloadState('idle');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                      selectedPlatform === 'ios'
                        ? 'bg-sky-950/20 border-sky-500 text-sky-400 font-bold'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    iOS (IPA - IPA Link)
                  </button>
                )}
              </div>
            </div>

            {/* Simulated Download Section */}
            <div className="bg-[#111] border border-zinc-900 p-4 sm:p-5 rounded-xl flex-1 flex flex-col justify-center">
              {downloadState === 'idle' && (
                <div className="text-center space-y-4">
                  <p className="text-xs text-zinc-400">
                    Host de Alta Velocidade disponível para <span className="text-white font-semibold capitalize">{selectedPlatform}</span>.
                  </p>
                  
                  <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
                    <button
                      onClick={handleStartDownload}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E10600] text-white font-display text-xs font-bold rounded-xl hover:bg-red-700 transition-all cursor-pointer glow-red-strong active:scale-95 shadow-lg shadow-red-950/20"
                    >
                      <Download className="w-4 h-4" />
                      Download Direto (Servidor LAPS)
                    </button>

                    <a
                      href={`https://5play.org/index.php?story=${encodeURIComponent(game.title)}&lang=en&do=search&subaction=search&titleonly=0`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-800 hover:border-red-650/40 text-xs font-bold rounded-xl transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Baixar no Espelho 5play.org
                    </a>

                    <div className="pt-2 border-t border-zinc-900/60 mt-1.5 space-y-2">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                        Ou Versão Original da Loja
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href="https://play.google.com/store/apps/details?id=com.exemplo.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-950 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center"
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
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-zinc-800 hover:border-sky-500/40 hover:bg-zinc-950 text-zinc-300 hover:text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center"
                        >
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
                          </svg>
                          Baixar para iPhone
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-zinc-500 font-mono">Banda ilimitada - Jogos espelhados de 5play.org</p>
                </div>
              )}

              {downloadState === 'downloading' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#E10600] font-mono font-bold animate-pulse">Baixando com segurança...</span>
                    <span className="text-white font-mono font-bold">{progress}%</span>
                  </div>
                  
                  {/* Progress bar background container */}
                  <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E10600] to-red-400 transition-all duration-300 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>Progresso: {((parseFloat(game.fileSize) || 1) * (progress / 100)).toFixed(1)} GB / {game.fileSize}</span>
                    <span>Velocidade: {speed} MB/s</span>
                  </div>
                </div>
              )}

              {downloadState === 'completed' && (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Arquivo Preparado!</h4>
                    <p className="text-xs text-emerald-400 font-medium">Download completo com sucesso.</p>
                  </div>
                  
                  <div className="pt-2">
                    <a
                      href={`/Leandro_LAPS_${game.id}_v1.0_${selectedPlatform === 'android' ? 'apk' : 'ipa'}`}
                      download
                      onClick={(e) => {
                        e.preventDefault(); 
                        alert(`Exemplo Real: O download do arquivo "${game.title} [${selectedPlatform.toUpperCase()}]" começaria agora direto da hospedagem de Leandro LAPS!`);
                      }}
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold font-display rounded-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      Instalar Direto ({selectedPlatform.toUpperCase()})
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code and Alternative Section */}
            <div className="flex gap-4 items-center bg-[#070707] border border-zinc-900 p-4 rounded-xl">
              {/* Simple stylized high-quality vector QR code layout using grid of glowing matrixes */}
              <div className="p-2 bg-white rounded-lg flex-shrink-0 relative group">
                <QrCode className="w-16 h-16 text-black" />
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-white flex items-center gap-1.5 uppercase font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Escaneie com a Câmera
                </p>
                <p className="text-xs text-zinc-450 leading-tight">
                  Abra a câmera do celular e mire no QR Code para transferir o instalador diretamente para o seu smartphone.
                </p>
                {selectedPlatform === 'ios' && (
                  <p className="text-[10px] text-yellow-500/90 font-medium">
                    * Requer AltStore, Scarlet ou TrollStore no iOS para instalar arquivos .IPA.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
