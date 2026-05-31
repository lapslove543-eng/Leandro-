/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, MessageSquare, ShieldAlert } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvidas Gerais');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, digite seu nome.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Sua mensagem deve conter no mínimo 10 caracteres.');
      return;
    }

    // Success response simulated
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      
      {/* Container Card */}
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Glow red top divider line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#E10600] glow-red"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-[#E10600] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'idle' ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#E10600]" />
                Contato LAPS
              </h3>
              <p className="text-xs text-zinc-450">Tire suas dúvidas, relate links offline ou envie sugestões de jogos.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Amanda Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#070707] border border-zinc-850 text-white px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/20 placeholder:text-zinc-650"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Seu E-mail principal</label>
                <input
                  type="email"
                  placeholder="Ex: amanda@gameplay.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070707] border border-zinc-850 text-white px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/20 placeholder:text-zinc-650"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Assunto</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#070707] border border-zinc-850 text-white px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#E10600]"
                >
                  <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                  <option value="Link Quebrado / Offline">Link Quebrado / Offline</option>
                  <option value="Sugerir Novo Jogo">Sugerir Novo Jogo</option>
                  <option value="Parcerias e Anúncios">Parcerias e Anúncios</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Mensagem</label>
                <textarea
                  placeholder="Escreva sua observação aqui com detalhes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-24 bg-[#070707] border border-zinc-850 text-white p-3.5 text-xs rounded-xl focus:outline-none focus:border-[#E10600] placeholder:text-zinc-650 resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#E10600] hover:bg-red-700 text-white font-display text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar Mensagem
              </button>

            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-white">Mensagem Enviada!</h4>
              <p className="text-xs text-zinc-450 leading-relaxed max-w-sm mx-auto">
                Olá <span className="text-white font-semibold">{name}</span>, obrigado pelo contato. 
                Sua solicitação sobre <span className="text-[#E10600] font-medium">"{subject}"</span> foi registrada. 
                Leandro LAPS responderá diretamente para <span className="text-zinc-300 font-medium">{email}</span> em até 24 horas.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
