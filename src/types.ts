/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  category: string;
  genre: 'RPG' | 'Ação' | 'Corrida' | 'Estratégia' | 'Terror' | 'Sobrevivência' | 'Apps';
  rating: number;
  description: string;
  coverUrl: string;
  isRare: boolean;
  rareBadgeText?: string;
  platforms: ('android' | 'ios')[];
  fileSize: string;
  releaseYear: number;
  downloadsCount: number;
  specifications: {
    androidMin: string;
    iosMin: string;
    ramMin: string;
  };
  dlUrlAndroid: string;
  dlUrlIos: string;
}

export interface Comment {
  id: string;
  gameId: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}
