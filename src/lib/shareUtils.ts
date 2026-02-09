/**
 * Social Sharing Utilities
 * Provides functions for generating share URLs and managing clipboard operations
 */

/**
 * Generates a WhatsApp share URL with pre-filled text
 * @param text - The message to pre-fill
 * @param url - The URL to share
 * @returns WhatsApp share URL
 */
export function getWhatsAppShareUrl(text: string, url: string): string {
  const message = `${text} ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a Facebook share URL
 * @param url - The URL to share
 * @returns Facebook share URL
 */
export function getFacebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Copies URL to clipboard with fallback for older browsers
 * @param url - The URL to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(url: string): Promise<boolean> {
  try {
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    textArea.remove();

    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

/**
 * Generates context-aware share messages based on page type
 */
export function generateShareMessage(
  pageType: 'route' | 'package' | 'temple',
  data: {
    from?: string;
    to?: string;
    startingPrice?: string;
    packageName?: string;
    duration?: string;
    templeName?: string;
    district?: string;
  }
): string {
  switch (pageType) {
    case 'route':
      return `Check out this ${data.from} → ${data.to} taxi service! Starting from ₹${data.startingPrice}. Book now:`;

    case 'package':
      const durationText = data.duration ? `${data.duration} tour: ` : '';
      return `Found this amazing ${durationText}${data.packageName} - Starting from ₹${data.startingPrice}.`;

    case 'temple':
      return `Explore ${data.templeName} in ${data.district}, Uttarakhand. A sacred pilgrimage destination. Plan your visit:`;

    default:
      return 'Check out this page:';
  }
}
