import { useQueries, useQuery } from '@tanstack/react-query';

import { IChannel } from '../interface/Interface';

export const getChannel = async () => {
  let page = 1;
  let totalPages = 1;
  let allChannels: IChannel[] = [];

  while (page <= totalPages) {
    const response = await fetch(`https://api.sr.se/api/v2/channels?page=${page}&format=json&size=100`);
    const data = await response.json();
// console.log(data.channels);

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


export const getChannelSchedule = async (id: number, date: string) => {
  const response = await fetch(`https://api.sr.se/api/v2/scheduledepisodes?channelid=${id}&date=${date}&format=json&size=1000`);
  const data = await response.json();

  if (data) {
    return data.schedule;
  } else {
    throw new Error('No schedule found');
  }
}

export const useChannelSchedule = (id: number) => {
  const currentDate = new Date();
  const queries = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    
    return {
      queryKey: ['channelSchedule', id, formattedDate],
      queryFn: () => getChannelSchedule(id, formattedDate),
    };
  });

  return useQueries({queries});
};