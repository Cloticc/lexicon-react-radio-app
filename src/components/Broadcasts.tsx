import { IBroadcast } from '../interface/Interface';
import { useBroadcasts } from '../api/apiBroadcasts';

export const Broadcasts = () => {
  const { data: broadcasts, isLoading: broadcastLoading, error: broadcastError } = useBroadcasts();

  // console.log(broadcasts);



  if (broadcastLoading) {
    return <div>Loading...</div>;
  }

  if (broadcastError) {
    return <div>Error: {broadcastError.message}</div>;
  }

  return (
    <div>
      <header className='header-wrapper'>
      </header>
      {broadcasts && broadcasts.map((broadcast: IBroadcast, index: number) => (
        <div key={index} className="m-4 p-4 border rounded shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{broadcast.name}</h2>
          <p className="text-gray-700">{broadcast.description}</p>
          <p>Start tid: {new Date(parseInt(broadcast.localstarttime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
          <p>Slut tid: {new Date(parseInt(broadcast.localstoptime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
          <p>Kanal: <a href={broadcast.liveaudio.url} target="_blank" rel="noopener noreferrer">{broadcast.channel.name}</a></p>
          <p>Utgivare: {broadcast.publisher.name}</p>
        </div>
      ))}
    </div>
  );
}