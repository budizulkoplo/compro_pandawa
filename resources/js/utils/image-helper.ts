export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '/images/placeholder.jpg';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `/storage/${path}`;
};
