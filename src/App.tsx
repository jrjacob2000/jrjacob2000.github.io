import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Wallet,
  ShieldCheck,
  Star,
  Copy,
  Check,
  Code2,
  Search,
} from 'lucide-react';
import { APPLICATIONS, ApplicationItem } from './data/applications';

const STORAGE_PINNED_KEY = 'jrjacob_portal_pinned_app_id';
const STORAGE_RECENT_KEY = 'jrjacob_portal_last_launched_id';
const STORAGE_SAME_TAB_KEY = 'jrjacob_portal_same_tab';

export default function App() {
  const [pinnedAppId, setPinnedAppId] = useState<ApplicationItem['id'] | null>(null);
  const [lastLaunchedId, setLastLaunchedId] = useState<ApplicationItem['id'] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openInSameTab, setOpenInSameTab] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedPin = localStorage.getItem(STORAGE_PINNED_KEY) as ApplicationItem['id'] | null;
      if (savedPin && APPLICATIONS.some((a) => a.id === savedPin)) {
        setPinnedAppId(savedPin);
      }
      const savedRecent = localStorage.getItem(STORAGE_RECENT_KEY) as ApplicationItem['id'] | null;
      if (savedRecent && APPLICATIONS.some((a) => a.id === savedRecent)) {
        setLastLaunchedId(savedRecent);
      }
      const savedSameTab = localStorage.getItem(STORAGE_SAME_TAB_KEY);
      if (savedSameTab === 'true') {
        setOpenInSameTab(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Keyboard shortcuts 1, 2, 3 to launch apps directly when not typing in search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape') {
          (e.target as HTMLElement).blur();
          setSearchQuery('');
        }
        return;
      }
      const matched = APPLICATIONS.find((app) => app.shortKey === e.key);
      if (matched) {
        recordLaunch(matched.id);
        if (openInSameTab) {
          window.location.assign(matched.liveUrl);
        } else {
          const anchor = document.getElementById(`launch-link-${matched.id}`) as HTMLAnchorElement | null;
          anchor?.click();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openInSameTab]);

  const recordLaunch = (appId: ApplicationItem['id']) => {
    setLastLaunchedId(appId);
    try {
      localStorage.setItem(STORAGE_RECENT_KEY, appId);
    } catch {
      // ignore
    }
  };

  const togglePin = (e: React.MouseEvent, appId: ApplicationItem['id']) => {
    e.preventDefault();
    e.stopPropagation();
    const next = pinnedAppId === appId ? null : appId;
    setPinnedAppId(next);
    try {
      if (next) {
        localStorage.setItem(STORAGE_PINNED_KEY, next);
      } else {
        localStorage.removeItem(STORAGE_PINNED_KEY);
      }
    } catch {
      // ignore
    }
  };

  const handleCopyUrl = async (e: React.MouseEvent, url: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleToggleSameTab = (checked: boolean) => {
    setOpenInSameTab(checked);
    try {
      localStorage.setItem(STORAGE_SAME_TAB_KEY, String(checked));
    } catch {
      // ignore
    }
  };

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = APPLICATIONS.filter((app) => {
      if (!q) return true;
      return [app.name, app.subtitle, app.category, app.summary, ...app.modules]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });

    // Keep natural 01, 02, 03 order unless an app is pinned to front
    return [...list].sort((a, b) => {
      if (a.id === pinnedAppId) return -1;
      if (b.id === pinnedAppId) return 1;
      return a.index.localeCompare(b.index);
    });
  }, [searchQuery, pinnedAppId]);

  const getAppIcon = (id: ApplicationItem['id']) => {
    if (id === 'gracebooks') {
      return (
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
      );
    }
    if (id === 'capitalflow') {
      return (
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0">
          <Wallet className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
        <ShieldCheck className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Minimal Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a
            href="#top"
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
          >
            JRJacob Launchpad
          </a>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none whitespace-nowrap">
              <input
                type="checkbox"
                checked={openInSameTab}
                onChange={(e) => handleToggleSameTab(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <span>Open in same tab</span>
            </label>

            <a
              href="https://github.com/jrjacob2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              @jrjacob2000
            </a>
          </div>
        </div>
      </header>

      {/* Main Centered Launchpad */}
      <main id="top" className="flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto px-6 py-10">
        {/* Compact Header + Quick Search */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <span>Application Launcher</span>
              <span aria-hidden="true">·</span>
              <span>3 Apps Available</span>
              {lastLaunchedId && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Recent: {APPLICATIONS.find((a) => a.id === lastLaunchedId)?.name}
                  </span>
                </>
              )}
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Select an application to launch
            </h1>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter apps..."
              aria-label="Filter applications"
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* 3 Launchpad Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {filteredApps.map((app) => {
            const isPinned = pinnedAppId === app.id;
            const isRecent = lastLaunchedId === app.id;

            return (
              <a
                key={app.id}
                id={`launch-link-${app.id}`}
                href={app.liveUrl}
                target={openInSameTab ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={() => recordLaunch(app.id)}
                className={`group relative bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isPinned ? 'border-blue-600 ring-1 ring-blue-600/15' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Utility Actions */}
                  <div className="flex items-start justify-between gap-3">
                    {getAppIcon(app.id)}

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => togglePin(e, app.id)}
                        title={isPinned ? 'Unpin default' : 'Pin first'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isPinned
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isPinned ? 'fill-blue-600' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleCopyUrl(e, app.liveUrl, app.id)}
                        title="Copy link"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        {copiedId === app.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Line */}
                  <div className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="font-mono font-semibold text-slate-700">[{app.shortKey}]</span>
                    <span aria-hidden="true">·</span>
                    <span>{app.category}</span>
                    {isPinned && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-600 font-medium">Pinned</span>
                      </>
                    )}
                    {!isPinned && isRecent && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-700 font-medium">Last Used</span>
                      </>
                    )}
                  </div>

                  {/* App Name & Subtitle */}
                  <h2 className="mt-1.5 text-xl font-bold text-slate-900 tracking-tight font-display group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </h2>
                  <div className="text-xs font-medium text-slate-500">{app.subtitle}</div>

                  {/* Short Description */}
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {app.summary}
                  </p>
                </div>

                {/* Bottom Launch Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400 truncate">
                    /{app.liveUrl.split('/').filter(Boolean).pop()}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
                    <span>Launch</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Keyboard Tip + Secondary Repository Links */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Tip: Press <span className="font-mono text-slate-700">1</span>,{' '}
            <span className="font-mono text-slate-700">2</span>, or{' '}
            <span className="font-mono text-slate-700">3</span> on your keyboard to launch an
            application directly.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {APPLICATIONS.map((app) => (
              <a
                key={app.id}
                href={app.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{app.name} Repo</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>JRJacob Applications · jrjacob2000.github.io</div>
          <div className="flex items-center gap-4">
            <a
              href="./privacy.html"
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="./terms.html"
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
