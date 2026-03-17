/**
 * Extracts YouTube video ID and returns an embeddable URL.
 * Supports various formats: watch?v=, youtu.be/, shorts/, etc.
 */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Already an embed URL
  if (url.includes('youtube.com/embed/')) return url;

  let videoId = '';
  
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtu.be')) {
      // youtu.be/ID
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/shorts/')) {
        // youtube.com/shorts/ID
        videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0];
      } else if (urlObj.searchParams.has('v')) {
        // youtube.com/watch?v=ID
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.includes('/embed/')) {
        // youtube.com/embed/ID
        videoId = urlObj.pathname.split('/embed/')[1].split('?')[0];
      }
    }
  } catch (e) {
    // Fallback for non-standard or partial URLs
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/shorts\/))([\w\-]{11})/);
    if (match) videoId = match[1];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

/**
 * Extracts YouTube video ID and returns a high-quality thumbnail URL.
 */
export function getYouTubeThumbnailUrl(url: string): string {
  if (!url) return '';
  
  let videoId = '';
  
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/shorts/')) {
        videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0];
      } else if (urlObj.searchParams.has('v')) {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1].split('?')[0];
      }
    }
  } catch (e) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/shorts\/))([\w\-]{11})/);
    if (match) videoId = match[1];
  }

  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
}

/**
 * Wraps Vercel Blob URLs with a proxy to bypass private access restrictions.
 */
export function getProxyUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.includes('vercel-storage.com')) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }
  return url;
}
