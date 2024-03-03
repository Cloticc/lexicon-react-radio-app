// apiSearch.ts

import { useQuery } from '@tanstack/react-query';

export const getSearchEpisodes = async (query: string) => {
  try {
    const response = await fetch(`https://api.sr.se/api/v2/episodes/search/?query=${query}&format=json`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.episodes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const useSearchEpisodes = (query: string) => {
  return useQuery({
    queryKey: ['searchEpisodes', query],
    queryFn: () => getSearchEpisodes(query)
  });
};
