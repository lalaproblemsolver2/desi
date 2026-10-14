import { useRef, useState } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';

export function ProcessVideo({ ambient = false }: { ambient?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const play = async () => {
    try { await ref.current?.play(); setStarted(true); } catch { setStarted(true); }
  };
  return <div className={`process-video relative overflow-hidden bg-earth-900 ${ambient ? 'h-full' : 'rounded-2xl border border-earth-200/50 shadow-xl'}`}>
    <video ref={ref} src="/media/bilona-process.mp4" preload="metadata" playsInline controls={started || failed} muted={ambient} autoPlay={ambient && !reduceMotion} loop={ambient} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} className={`w-full ${ambient ? 'h-full object-cover' : 'aspect-video object-contain'}`} aria-label="Traditional Bilona desi ghee making process" />
    {ambient && !failed && <button type="button" onClick={() => playing ? ref.current?.pause() : void ref.current?.play().catch(() => setFailed(true))} aria-label={playing ? 'Pause background video' : 'Play background video'} className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-earth-900/60 text-cream-100 flex items-center justify-center hover:bg-earth-900">{playing ? <Pause size={18}/> : <Play size={18}/>}</button>}
    {!ambient && !started && !failed && <button type="button" onClick={play} className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-earth-900/20 hover:bg-earth-900/10 transition-colors text-white" aria-label="Play the Bilona ghee making video"><span className="w-16 h-16 rounded-full bg-ghee-500 text-earth-900 flex items-center justify-center shadow-xl"><Play size={26} fill="currentColor" /></span><span className="text-sm font-medium bg-earth-900/70 px-4 py-2 rounded-full">Watch the Bilona tradition</span></button>}
    {failed && <p className="p-4 text-cream-100 flex items-center gap-2"><AlertCircle size={18} />Video could not load. <a href="/media/bilona-process.mp4" className="underline">Open video</a></p>}
  </div>;
}
