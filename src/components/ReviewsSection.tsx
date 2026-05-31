/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User, Calendar, Sparkles } from 'lucide-react';
import { Game, Comment } from '../types';
import { INITIAL_COMMENTS } from '../gamesData';

interface ReviewsSectionProps {
  game: Game;
}

export default function ReviewsSection({ game }: ReviewsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load comments from localStorage or gamesData default
  useEffect(() => {
    const stored = localStorage.getItem('leandrolaps_comments');
    if (stored) {
      try {
        const parsed: Comment[] = JSON.parse(stored);
        // Filter those relevant to the current game plus pre-loaded ones if not there
        const filtered = parsed.filter(c => c.gameId === game.id);
        
        // Combine with default initial comments for this game if none exist
        const defaultComments = INITIAL_COMMENTS.filter(c => c.gameId === game.id);
        const uniqueIds = new Set(filtered.map(c => c.id));
        const merged = [...filtered, ...defaultComments.filter(dc => !uniqueIds.has(dc.id))];

        // Sort by date or id descending
        setComments(merged);
      } catch (e) {
        // Fallback to default INITIAL COMMENTS
        setComments(INITIAL_COMMENTS.filter(c => c.gameId === game.id));
      }
    } else {
      setComments(INITIAL_COMMENTS.filter(c => c.gameId === game.id));
    }
  }, [game]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!authorName.trim()) {
      setErrorMsg('Por favor, informe seu nome ou nickname de jogador.');
      return;
    }
    if (!content.trim() || content.trim().length < 5) {
      setErrorMsg('Sua avaliação deve conter pelo menos 5 caracteres.');
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    const newComment: Comment = {
      id: 'custom-' + Date.now(),
      gameId: game.id,
      author: authorName.trim(),
      rating: rating,
      content: content.trim(),
      date: formattedDate
    };

    const stored = localStorage.getItem('leandrolaps_comments');
    let allComments: Comment[] = [];
    if (stored) {
      try {
        allComments = JSON.parse(stored);
      } catch (err) {}
    }
    
    // Add default initial comments if we don't have them in storage yet
    const storedIds = new Set(allComments.map(c => c.id));
    const defaultsToStore = INITIAL_COMMENTS.filter(dc => !storedIds.has(dc.id));
    allComments = [newComment, ...allComments, ...defaultsToStore];

    localStorage.setItem('leandrolaps_comments', JSON.stringify(allComments));
    setComments([newComment, ...comments]);

    // Resets
    setAuthorName('');
    setRating(5);
    setContent('');
  };

  const renderRatingStars = (num: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((val) => {
          const isFilled = interactive 
            ? (hoverRating !== null ? val <= hoverRating : val <= rating)
            : val <= num;

          return (
            <Star
              key={val}
              className={`w-4 h-4 cursor-pointer transition-colors ${
                isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'
              }`}
              onMouseEnter={() => interactive && setHoverRating(val)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              onClick={() => interactive && setRating(val)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 bg-[#0d0d0d] border border-zinc-900 rounded-2xl p-6 sm:p-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-900">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E10600]" />
            Avaliações e Comentários
          </h3>
          <p className="text-xs text-zinc-500">Veja o que a comunidade gamer do Leandro LAPS está dizendo.</p>
        </div>
        
        {/* Statistics review count */}
        <div className="bg-[#121212] border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-3">
          <div className="text-center font-mono">
            <p className="text-lg font-bold text-white">{game.rating.toFixed(1)}</p>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Média</p>
          </div>
          <div className="h-6 border-r border-zinc-800"></div>
          <div className="text-zinc-400 text-xs">
            {comments.length} {comments.length === 1 ? 'avaliação' : 'avaliações'} registrada{comments.length !== 1 && 's'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Comment Feed List */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {comments.length === 0 ? (
            <div className="py-12 text-center bg-[#111111]/35 rounded-xl border border-dashed border-zinc-850">
              <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400">Nenhum comentário por aqui ainda.</p>
              <p className="text-[10px] text-zinc-500 mt-1">Seja o primeiro a avaliar este jogo!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div 
                key={comment.id}
                className="bg-[#111] border border-zinc-900 p-4 rounded-xl flex flex-col justify-between hover:border-zinc-800 transition-colors gap-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-full flex items-center justify-center font-bold text-xs uppercase font-mono">
                      {comment.author.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                        {comment.author}
                        {comment.id.startsWith('custom') && (
                          <span className="text-[8px] bg-red-950 text-[#E10600] px-1.5 py-0.5 rounded uppercase font-semibold font-mono tracking-wider">
                            Novo
                          </span>
                        )}
                      </p>
                      <span className="text-[10px] text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {comment.date}
                      </span>
                    </div>
                  </div>
                  {renderRatingStars(comment.rating)}
                </div>

                <p className="text-zinc-300 text-xs leading-relaxed font-light">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Right: Write comment/review Form */}
        <div className="lg:col-span-5 bg-[#121212]/50 border border-zinc-900 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-1.5 text-zinc-300 font-bold text-sm uppercase tracking-wide font-mono">
            <Sparkles className="w-4 h-4 text-[#E10600]" />
            Deixar Avaliação
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nickname input */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Nome / Nickname</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Ex: Player_EliteX"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-zinc-800 text-white pl-9 pr-4 py-2 text-xs rounded-lg focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/20 placeholder:text-zinc-650"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Stars selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400 block">Sua Nota</label>
              <div className="bg-[#0a0a0a] border border-zinc-800 p-2.5 rounded-lg inline-block">
                {renderRatingStars(rating, true)}
              </div>
            </div>

            {/* Text input */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-400">Seu Comentário</label>
              <textarea
                placeholder="Escreva o que achou do jogo, desempenho, tradução ou jogabilidade mobile..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-24 bg-[#0a0a0a] border border-zinc-800 text-white p-3 text-xs rounded-lg focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/20 placeholder:text-zinc-650 resize-none leading-relaxed"
                maxLength={250}
              />
              <div className="flex justify-between text-[10px] text-zinc-650">
                <span>Não use spam ou insultos</span>
                <span>{content.length}/250 caps</span>
              </div>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#E10600] hover:bg-red-700 text-white font-display text-xs font-bold rounded-lg cursor-pointer transition-colors active:scale-98 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar Avaliação
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
