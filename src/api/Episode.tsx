import { useQuery } from '@tanstack/react-query';

export const useProgramDetails = (id: number) => {
  const fetchProgramDataDetails = async () => {
    const response = await fetch(`https://api.sr.se/api/v2/programs/${id}?format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data) {
      return data.program;
    }
    throw new Error('No program found');
  }

  return useQuery({
    queryKey: ['program', id],
    queryFn: fetchProgramDataDetails
  });
}


export const usePodFiles = (id: number) => {
  const fetchPodFiles = async () => {
    const response = await fetch(`https://api.sr.se/api/v2/podfiles?programid=${id}&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      return data.podfiles;
    }
    throw new Error('No pod files found');
  }

  return useQuery({
    queryKey: ['podfiles', id],
    queryFn: fetchPodFiles
  });
}

// export const useEpisodeDetails = (episodeId: number) => {
//   const fetchEpisodeDetails = async () => {
//     const response = await fetch(`https://api.sr.se/api/v2/episodes/get?id=${episodeId}&format=json`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();

//     if (data) {
//       return data.episode;
//     }
//     throw new Error('No episode details found');
//   }

//   return useQuery({
//     queryKey: ['episode', episodeId],
//     queryFn: fetchEpisodeDetails
//   });
// }

export const useEpisodes = (id: number, page: number) => {
  const fetchEpisodes = async () => {
    // const response = await fetch(`https://api.sr.se/api/v2/episodes/index?format=json&page=${page}`);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate()).padStart(2, '0')}`;

    const startDateStr = '2010-01-01';
    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${startDateStr}&todate=${twoDaysAgoStr}&audioquality=hi&format=json&page=${page}`);
    // const response = await fetch(`https://api.sr.se/v2/episodes/index?programid=${id}&format=json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      return data.episodes;
    }
    throw new Error('No episodes found');
  }

  return useQuery({
    queryKey: ['episodes', page],
    queryFn: fetchEpisodes
  });
}


