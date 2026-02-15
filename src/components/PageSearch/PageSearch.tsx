'use client';

import { useState } from 'react';

import Search from '../Search/Search';

/**
 * Wrapper component for the Search functionality on pages.
 * Manages the state for room type filter and search query.
 */
const PageSearch = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Search
      roomTypeFilter={roomTypeFilter}
      searchQuery={searchQuery}
      setRoomTypeFilter={setRoomTypeFilter}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default PageSearch;
