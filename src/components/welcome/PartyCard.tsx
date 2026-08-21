import { Lock, MapPin } from 'lucide-react'
import type { SampleParty } from '@/data/sampleParties'
import { cn } from '@/lib/cn'
import { notify } from '@/lib/notify'

const vibeClass = {
  'Coffee break': 'bg-[rgba(212,175,120,0.08)] text-[#b8926a]',
  'After hours': 'bg-white/5 text-[#9c9686]',
  'Golden hour': 'bg-[rgba(212,154,92,0.1)] text-[#d49a5c]',
} as const

function shortDate(date: string) {
  return date.replace(/\/\d{2}$/, '')
}

function openFlyer() {
  notify.info('Flyer drops once this party goes live.')
}

export function FeaturedPartyCard({ party }: { party: SampleParty }) {
  return (
    <button
      className="group relative h-52 w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:h-64 lg:h-72 xl:h-80"
      onClick={openFlyer}
      type="button"
    >
      <img
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        src={party.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
      <p className="absolute top-4 left-5 text-[11px] tracking-[0.12em] text-[#d4af78] uppercase lg:top-6 lg:left-6">
        Almost full
      </p>
      <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 lg:right-6 lg:bottom-6 lg:left-6">
        <div className="min-w-0">
          <h3 className="font-serif text-[24px] text-[#f7f3ec] lg:text-[32px]">
            {party.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 truncate text-xs text-[#d8d0c4] lg:text-sm">
            <MapPin aria-hidden className="size-3.5 shrink-0 text-[#d4af78]" />
            <span className="truncate">
              @{party.host} · {party.time} · {party.date}
              {party.location ? ` · ${party.location}` : ''}
            </span>
          </p>
        </div>
        <p className="shrink-0 rounded-lg border border-[rgba(232,131,79,0.55)] bg-[rgba(18,12,8,0.72)] px-3 py-1.5 text-xs whitespace-nowrap text-[#e8834f] backdrop-blur-sm lg:px-3.5 lg:py-2">
          {party.spotsLeft} spots left
        </p>
      </div>
    </button>
  )
}

export function PartyCard({ party }: { party: SampleParty }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#26221c] bg-[#141210] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#d4af78]/35 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-[120px] overflow-hidden lg:h-[150px] xl:h-[170px]">
        <img
          alt=""
          className={cn(
            'size-full object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
            party.confidential && 'scale-105 blur-[2px] brightness-50',
          )}
          loading="lazy"
          src={party.image}
        />
        {party.confidential ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/35"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.06) 5px, rgba(255,255,255,0.06) 6px)',
            }}
          >
            <Lock aria-hidden className="size-4 text-[#d4af78]" />
            <p className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
              Members only
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 lg:p-5">
        <h3 className="font-serif text-base text-[#f0ebe1] lg:text-lg">{party.title}</h3>
        {party.confidential ? (
          <p className="mt-1 text-[11px] text-[#6f6a5e] italic lg:text-xs">
            Location visible to members
          </p>
        ) : (
          <p className="mt-1 text-xs text-[#8c8578] lg:text-[13px]">
            @{party.host} · {shortDate(party.date)}, {party.time}
          </p>
        )}
        {party.location && !party.confidential ? (
          <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-[#6f6a5e]">
            <MapPin aria-hidden className="size-3 shrink-0" />
            {party.location}
          </p>
        ) : (
          <span className="mt-1 flex-1" />
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span
            className={cn(
              'rounded-[7px] px-2.5 py-1 text-[11px]',
              vibeClass[party.vibe],
            )}
          >
            {party.vibe}
          </span>
          <button
            className="cursor-pointer rounded-lg border border-[#3a352c] px-3 py-1.5 text-[11px] text-[#e8e2d5] transition-colors duration-150 hover:border-[#d4af78] hover:bg-[rgba(212,175,120,0.06)] motion-reduce:transition-none"
            onClick={openFlyer}
            type="button"
          >
            Flyer
          </button>
        </div>
      </div>
    </article>
  )
}
