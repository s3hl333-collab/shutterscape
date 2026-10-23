export function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("http")) return src;
  return `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 75}`;
}
