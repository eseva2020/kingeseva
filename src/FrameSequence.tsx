import { useEffect, useRef, useState } from 'react';
type Beat = {
    start: number;
    end: number;
    from: number;
    to: number;
};
type Manifest = {
    count: number;
    width: number;
    height: number;
    pattern: string;
    poster: string;
    beats: Beat[];
};
// Optional generated-media adapter. No media is downloaded until configured.
// Sixteen cached decoded frames, three concurrent requests, two attempts per failure.
export function FrameSequence({ manifestUrl, poster }: {
    manifestUrl: string;
    poster: string;
}) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const mobile = matchMedia('(max-width:700px)');
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setEnabled(!mobile.matches && !reduced.matches);
        update();
        mobile.addEventListener('change', update);
        reduced.addEventListener('change', update);
        return () => { mobile.removeEventListener('change', update); reduced.removeEventListener('change', update); };
    }, []);
    useEffect(() => {
        const c = canvas.current;
        if (!c || !enabled)
            return;
        const ctx = c.getContext('2d');
        if (!ctx)
            return;
        const connection = (navigator as Navigator & {
            connection?: {
                saveData?: boolean;
            };
        }).connection;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(max-width:700px)').matches || connection?.saveData)
            return;
        const controller = new AbortController();
        const cache = new Map<number, ImageBitmap>();
        const attempts = new Map<number, number>();
        const pending = new Set<number>();
        let manifest: Manifest | null = null;
        let wanted = 0;
        let active = 0;
        let disposed = false;
        let raf = 0;
        const draw = () => { const b = cache.get(wanted); if (b) {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(b, 0, 0, c.width, c.height);
            c.dataset.frame = String(wanted);
        } };
        const pump = () => { if (disposed || !manifest)
            return; const queue = [wanted, ...[1, -1, 2, -2, 3, -3].map(n => wanted + n)].filter(n => n >= 0 && n < manifest!.count); for (const n of queue) {
            if (active >= 3)
                break;
            if (cache.has(n) || pending.has(n) || (attempts.get(n) || 0) >= 2)
                continue;
            active++;
            pending.add(n);
            attempts.set(n, (attempts.get(n) || 0) + 1);
            const url = new URL(manifest.pattern.replace('{index}', String(n).padStart(4, '0')), new URL(manifestUrl, location.href)).href;
            fetch(url, { signal: controller.signal }).then(r => { if (!r.ok)
                throw Error('frame'); return r.blob(); }).then(createImageBitmap).then(b => { if (disposed) {
                b.close();
                return;
            } attempts.delete(n); cache.set(n, b); if (cache.size > 16) {
                const farthest = [...cache.keys()].sort((a, b) => Math.abs(b - wanted) - Math.abs(a - wanted))[0];
                cache.get(farthest)?.close();
                cache.delete(farthest);
            } draw(); }).catch(() => { }).finally(() => { active--; pending.delete(n); pump(); });
        } };
        const update = () => { raf = 0; if (!manifest)
            return; const section = c.closest('.hero-story'); if (!section)
            return; const rect = section.getBoundingClientRect(); const travel = Math.max(1, section.clientHeight - innerHeight); const p = Math.max(0, Math.min(1, -rect.top / travel)); const beat = manifest.beats.find(b => p >= b.start && p <= b.end) || manifest.beats.at(-1)!; const q = Math.max(0, Math.min(1, (p - beat.start) / (beat.end - beat.start))); wanted = Math.max(0, Math.min(manifest.count - 1, Math.round(beat.from + (beat.to - beat.from) * q))); draw(); pump(); };
        const onScroll = () => { if (!raf)
            raf = requestAnimationFrame(update); };
        fetch(manifestUrl, { signal: controller.signal }).then(r => r.json()).then((m: Manifest) => { if (!Number.isInteger(m.count) || m.count < 2 || !m.width || !m.height || !m.pattern.includes('{index}') || !m.beats?.length)
            throw Error('manifest'); manifest = m; c.width = m.width; c.height = m.height; update(); }).catch(() => { });
        addEventListener('scroll', onScroll, { passive: true });
        addEventListener('resize', onScroll);
        return () => { disposed = true; controller.abort(); cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cache.forEach(b => b.close()); cache.clear(); };
    }, [manifestUrl, enabled]);
    return <canvas className="frame-sequence" ref={canvas} aria-hidden="true" style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover' } : undefined}/>;
}
