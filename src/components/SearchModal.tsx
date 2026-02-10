import { useEffect, useState, useRef } from 'react';
import Fuse from 'fuse.js';
import type { SearchResult } from '../lib/searchData';

interface SearchModalProps {
  searchData: SearchResult[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ searchData, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Configure Fuse.js for fuzzy search
  const fuse = useRef(
    new Fuse(searchData, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'subtitle', weight: 1.5 },
        { name: 'description', weight: 1 },
        { name: 'keywords', weight: 1.5 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  );

  const historyPushedRef = useRef(false);

  // Focus input when modal opens + handle mobile back button
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      window.history.pushState({ searchModal: true }, '');
      historyPushedRef.current = true;
      const handlePopState = () => {
        historyPushedRef.current = false;
        onClose();
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // Clean up history entry if modal closed by ESC/backdrop/button
        if (historyPushedRef.current) {
          window.history.back();
          historyPushedRef.current = false;
        }
      };
    }
  }, [isOpen]);

  // Handle search query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = fuse.current.search(query);
    // Sort by type priority: routes first, then packages, then others
    const typePriority: Record<string, number> = { route: 0, package: 1, temple: 2, attraction: 3 };
    const sortedResults = searchResults
      .map((result) => result.item)
      .sort((a, b) => (typePriority[a.type] ?? 99) - (typePriority[b.type] ?? 99));
    const filteredResults = sortedResults.slice(0, 8);
    setResults(filteredResults);
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  const handleResultClick = (result: SearchResult) => {
    if (result.url !== '#') {
      window.location.href = result.url;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'route':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
            <circle cx="7.5" cy="14.5" r="1.5"/>
            <circle cx="16.5" cy="14.5" r="1.5"/>
          </svg>
        );
      case 'package':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'temple':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'attraction':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      route: { label: 'Route', color: 'bg-blue-100 text-blue-700' },
      package: { label: 'Package', color: 'bg-purple-100 text-purple-700' },
      temple: { label: 'Temple', color: 'bg-orange-100 text-orange-700' },
      attraction: { label: 'Attraction', color: 'bg-green-100 text-green-700' },
    };
    const badge = badges[type as keyof typeof badges];
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-gray-200">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, packages, temples..."
            className="flex-1 px-4 py-4 text-lg outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border border-gray-300">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto"
        >
          {query.trim() === '' ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-lg font-medium mb-1">Start typing to search</p>
              <p className="text-sm">
                Search for routes, tour packages, temples, and attractions
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium mb-1">No results found</p>
              <p className="text-sm">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  disabled={result.url === '#'}
                  className={`w-full flex items-start gap-4 px-4 py-3 text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-50 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  } ${result.url === '#' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`mt-1 ${index === selectedIndex ? 'text-primary-600' : 'text-gray-400'}`}>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {result.title}
                      </h3>
                      {getTypeBadge(result.type)}
                    </div>
                    {result.subtitle && (
                      <p className="text-sm text-gray-600 mb-1">{result.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                  {result.price && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary-600">
                        ₹{result.price}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer with keyboard hints */}
        {results.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
