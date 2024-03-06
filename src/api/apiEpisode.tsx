import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useProgramDetails = (id: number) => {
  const fetchProgramDataDetails = async () => {
    // console.log(id);

    const response = await fetch(`https://api.sr.se/api/v2/programs/${id}?format=json&size=1000`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data.program);

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
  const fetchPodFiles = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://api.sr.se/api/v2/podfiles?programid=${id}&page=${pageParam}&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data: data.podfiles, nextPage: data.podfiles.length > 0 ? pageParam + 1 : undefined };
  }

  return useInfiniteQuery({
    queryKey: ['podfiles', id],
    queryFn: fetchPodFiles,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}

export const useEpisodes = (id: number) => {
  const fetchEpisodes = async ({ pageParam = 1 }) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate()).padStart(2, '0')}`;

    const startDateStr = '2010-01-01';
    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${startDateStr}&todate=${twoDaysAgoStr}&audioquality=hi&format=json&page=${pageParam}`);


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data.episodes);

    if (data) {
      return { data: data.episodes, nextPage: pageParam + 1 };
    }
    throw new Error('No episodes found');
  }

  return useInfiniteQuery({
    queryKey: ['episodes', id],
    queryFn: fetchEpisodes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,

  });
}


export const useSearchEpisodes = (search: string) => {
  const fetchSearchEpisodes = async () => {
    const response = await fetch(`https://api.sr.se/api/v2/episodes/search/?query=${search}&format=json&size=1000`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data.episodes);

    return data.episodes;
  }

  return useQuery({
    queryKey: ['search', search],
    queryFn: fetchSearchEpisodes
  });

}

// http://api.sr.se/api/v2/broadcasts?programid=3718

const fetchBroadcasts = async (id: number) => {
  const response = await fetch(`https://api.sr.se/api/v2/broadcasts?programid=${id}&format=json&size=1000`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.broadcasts);

  return data.broadcasts;
}

export const useBroadcasts = (id: number) => {
  return useQuery({
    queryKey: ['broadcasts', id],
    queryFn: () => fetchBroadcasts(id)
  });
}




// const { data: podFiles, isLoading: podFilesLoading, error: podFilesError } = usePodFiles(id);
// const { data: podFiles, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = usePodFiles(id);

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

// export const useEpisodes = (id: number, page: number) => {
//   const fetchEpisodes = async () => {
//     // const response = await fetch(`https://api.sr.se/api/v2/episodes/index?format=json&page=${page}`);
//     const twoDaysAgo = new Date();
//     twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
//     const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate()).padStart(2, '0')}`;

//     const startDateStr = '2010-01-01';
//     const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${startDateStr}&todate=${twoDaysAgoStr}&audioquality=hi&format=json&page=${page}`);
//     // const response = await fetch(`https://api.sr.se/v2/episodes/index?programid=${id}&format=json`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();

//     if (data) {
//       return data.episodes;
//     }
//     throw new Error('No episodes found');
//   }

//   return useQuery({
//     queryKey: ['episodes', page],
//     queryFn: fetchEpisodes
//   });
// }
