'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

interface Assessment {
  rowId: number;
  clientName: string;
  analysisDate: string;
  archetype: string;
  confidence: string;
  submittedBy: string;
  workType: string;
  reviewStatus: string;
  createdAt: string;
}

const ARCHETYPE_FILTERS = [
  'All archetypes',
  'ARCHITECT',
  'VISIONARY',
  'ACCELERATOR',
  'ENTREPRENEUR',
  'ARCHITECT & VISIONARY',
  'ARCHITECT & ACCELERATOR',
  'ARCHITECT & ENTREPRENEUR',
  'VISIONARY & ACCELERATOR',
  'VISIONARY & ENTREPRENEUR',
  'ACCELERATOR & ENTREPRENEUR',
  'MIXED EXPECTATIONS',
];

export default function AssessmentsPage() {
  const [data, setData] = useState<Assessment[]>([]);
  const [sheetUrl, setSheetUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [archetypeFilter, setArchetypeFilter] = useState('All archetypes');
  const [submittedByFilter, setSubmittedByFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/assessments', { cache: 'no-store' });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error || 'Failed to load.');
        setData(json.assessments || []);
        setSheetUrl(json.sheetUrl || '');
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const submittedByOptions = useMemo(() => {
    const set = new Set<string>();
    for (const a of data) if (a.submittedBy) set.add(a.submittedBy);
    return ['All', ...Array.from(set).sort()];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((a) => {
      if (archetypeFilter !== 'All archetypes' && a.archetype !== archetypeFilter) return false;
      if (submittedByFilter !== 'All' && a.submittedBy !== submittedByFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay =
          `${a.clientName} ${a.archetype} ${a.submittedBy} ${a.workType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, archetypeFilter, submittedByFilter, search]);

  return (
    <div className="flex-1">
      <PageHeader projectName="CLIENT FIT ANALYSIS" />

      <main className="max-w-[1400px] mx-auto px-10 py-12 relative z-10">
        <div className="mb-10 fade-in">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-deep">
            Library
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-tightish mt-3 mb-4">
            Completed assessments
          </h1>
          <p className="font-sans text-sm leading-relaxed text-ink-soft max-w-prose text-pretty">
            All client analyses saved to Smartsheet. Search by name or filter
            by archetype to find the read you need.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-12 md:col-span-5">
            <label className="block font-sans text-sm font-semibold text-ink mb-2">
              Search
            </label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Client, archetype, person, work type"
                className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-ink focus:bg-paper-tint/70 font-sans"
              />
            </div>
          </div>
          <div className="col-span-6 md:col-span-4">
            <label className="block font-sans text-sm font-semibold text-ink mb-2">
              Archetype
            </label>
            <select
              value={archetypeFilter}
              onChange={(e) => setArchetypeFilter(e.target.value)}
              className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm px-3 py-2.5 text-sm text-ink transition-colors focus:border-ink font-sans"
            >
              {ARCHETYPE_FILTERS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6 md:col-span-3">
            <label className="block font-sans text-sm font-semibold text-ink mb-2">
              Submitted by
            </label>
            <select
              value={submittedByFilter}
              onChange={(e) => setSubmittedByFilter(e.target.value)}
              className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm px-3 py-2.5 text-sm text-ink transition-colors focus:border-ink font-sans"
            >
              {submittedByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-rule-soft">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted tabnum">
            Showing {filtered.length} of {data.length}
          </span>
          {sheetUrl && (
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted hover:text-ink transition-colors flex items-center gap-1"
            >
              Open in Smartsheet
              <ArrowUpRight size={11} strokeWidth={2.5} />
            </a>
          )}
        </div>

        {/* Table */}
        {loading && (
          <p className="font-sans text-sm text-ink-muted py-8">Loading assessments...</p>
        )}

        {error && (
          <div className="p-4 border border-ink rounded-sm bg-paper-tint">
            <p className="font-sans text-sm text-ink">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="font-sans text-sm text-ink-muted py-8">
            No assessments match your filters.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="bg-paper border border-rule-soft rounded-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-rule-soft bg-paper-tint/40">
              <div className="col-span-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                Client
              </div>
              <div className="col-span-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                Date
              </div>
              <div className="col-span-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                Archetype
              </div>
              <div className="col-span-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                Submitted by
              </div>
              <div className="col-span-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted text-right">
                Status
              </div>
            </div>
            <div>
              {filtered.map((a, i) => (
                <div
                  key={a.rowId}
                  className={`grid grid-cols-12 gap-4 px-5 py-4 items-center ${
                    i !== filtered.length - 1 ? 'border-b border-rule-soft/60' : ''
                  } hover:bg-paper-tint/30 transition-colors`}
                >
                  <div className="col-span-3">
                    <p className="font-sans text-sm font-semibold text-ink">
                      {a.clientName || 'Unnamed'}
                    </p>
                    {a.workType && (
                      <p className="font-sans text-xs text-ink-muted mt-0.5">
                        {a.workType}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="font-sans text-sm text-ink tabnum">
                      {a.analysisDate || '-'}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <span
                      className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] rounded-sm ${
                        a.archetype.includes('MIXED')
                          ? 'bg-paper-tint text-ink-muted'
                          : 'bg-ink text-paper'
                      }`}
                    >
                      {a.archetype || 'Unknown'}
                    </span>
                    {a.confidence && (
                      <p className="font-sans text-xs text-ink-muted mt-1">
                        Conf: {a.confidence}
                      </p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <p className="font-sans text-sm text-ink truncate">
                      {a.submittedBy || '-'}
                    </p>
                  </div>
                  <div className="col-span-1 text-right">
                    <span
                      className={`font-sans text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        a.reviewStatus === 'Validated by Client Lead'
                          ? 'text-accent-deep'
                          : 'text-ink-muted'
                      }`}
                    >
                      {(a.reviewStatus || 'Pending').split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
