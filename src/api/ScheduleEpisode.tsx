import { useQuery } from '@tanstack/react-query';

// http://api.sr.se/api/v2/scheduledepisodes?channelid=164 


export const getScheduleEpisodes = async (channelId: number) => {
  const response = await fetch(`https://api.sr.se/api/v2/scheduledepisodes?channelid=${channelId}&format=json`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.schedule;
};

export const useScheduleEpisodes = (channelId: number) => {
  return useQuery({
    queryKey: ['scheduleEpisodes', channelId],
    queryFn: () => getScheduleEpisodes(channelId)
  });
};

