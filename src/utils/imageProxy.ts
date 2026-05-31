/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Automatically proxies external image URLs that might have strict hotlink protection
 * (such as Wikipedia, Wikimedia Commons, etc.) through the reliable and secure images.weserv.nl proxy.
 *
 * @param url The original image url
 * @returns The proxied or original image url
 */
export function getProxiedImageUrl(url: string): string {
  if (!url) return '';
  
  // Unsplash and local assets do not need proxying as they allow cross-origin embeds natively
  if (url.startsWith('/') || url.startsWith('data:') || url.includes('images.unsplash.com')) {
    return url;
  }
  
  // Return the secure, fast image-caching wrapper
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
}
