export default function lowerExceptFirst(text: string): string {
    if (!text) return "";
    return text.charAt(0) + text.slice(1).toLowerCase();
  }
