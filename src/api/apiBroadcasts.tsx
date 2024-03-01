import { useQuery } from '@tanstack/react-query';

export const useBroadcasts = () => {
  // http://api.sr.se/api/v2/extra/broadcasts
  const fetchBroadcasts = async () => {
    const response = await fetch(`https://api.sr.se/api/v2/extra/broadcasts?format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
     console.log(data.broadcasts);
     
    return data.broadcasts;
  }

  return useQuery({
    queryKey: ['broadcasts'],
    queryFn: fetchBroadcasts
  });
} 




