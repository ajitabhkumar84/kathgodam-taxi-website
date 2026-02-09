import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import type { SearchResult } from '../lib/searchData';

interface SearchModalContainerProps {
  searchData: SearchResult[];
}

export default function SearchModalContainer({ searchData }: SearchModalContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    // Listen for custom event from navbar
    const handleOpenSearch = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openSearch', handleOpenSearch);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openSearch', handleOpenSearch);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <SearchModal
      searchData={searchData}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
