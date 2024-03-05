import { IChannel } from '../interface/Interface';
import { useQuery } from '@tanstack/react-query';

export const getChannel = async () => {
  let page = 1;
  let totalPages = 1;
  let allChannels: IChannel[] = [];

  while (page <= totalPages) {
    const response = await fetch(`https://api.sr.se/api/v2/channels?page=${page}&format=json&size=100`);
    const data = await response.json();

    if (data) {
      allChannels = allChannels.concat(data.channels);
      totalPages = data.pagination.totalpages;
    } else {
      throw new Error('No channels found');
    }

    // console.log(allChannels);
    
    page++;
  }

  return allChannels;
};

export const useChannel = () => {
  return useQuery({
    queryKey: ['channels'],
    queryFn: getChannel,
    enabled: true
  });
};