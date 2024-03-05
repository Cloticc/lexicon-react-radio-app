// apiSearch.ts

import { useQuery } from '@tanstack/react-query';

export const getSearchEpisodes = async (query: string) => {
  try {
    const response = await fetch(`https://api.sr.se/api/v2/episodes/search/?query=${query}&format=json`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    // console.log('Data:', data);

    return data.episodes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export const useSearchEpisodes = (query: string) => {
  return useQuery({
    queryKey: ['searchEpisodes', query],
    queryFn: () => getSearchEpisodes(query),
    staleTime: 0,
  });
};


export const getPrograms = async () => {
  try {
    let data;

    const cachedData = localStorage.getItem('programs');
    if (cachedData) {
      data = JSON.parse(cachedData);
    } else {
      const response = await fetch(`https://api.sr.se/api/v2/programs?format=json&size=1000`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      data = await response.json();
      localStorage.setItem('programs', JSON.stringify(data));
    }

    return data.programs;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const useSearchPrograms = (name: string) => {
  return useQuery({
    queryKey: ['searchPrograms', name],
    queryFn: () => getPrograms().then(programs => programs.filter((program: { name: string; }) => program.name.toLowerCase().includes(name.toLowerCase()))),
    staleTime: 300000, // cache for 5 minutes
  });
};