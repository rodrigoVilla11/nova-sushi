"use client";

import SpotifyEmbed from "./SpotifyEmbed";

export default function SpotifySection({
  playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID || "",
}: { playlistId?: string }) {
  return (
    <section id="spotify" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Música en el local</h2>
            <p className="text-white/70 text-sm">Seguinos en Spotify y ponete en mood Nõva 🎧</p>
          </div>
          <a
            href={`https://open.spotify.com/playlist/${encodeURIComponent(playlistId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95"
          >
            ABRIR EN SPOTIFY
          </a>
        </div>

        <SpotifyEmbed kind="playlist" id={playlistId} height={352} />

        <div className="md:hidden">
          <a
            href={`https://open.spotify.com/playlist/${encodeURIComponent(playlistId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95"
          >
            ABRIR EN SPOTIFY
          </a>
        </div>
      </div>
    </section>
  );
}
