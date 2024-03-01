import { IBroadcast } from '../interface/Interface';
import { useBroadcasts } from '../api/apiBroadcasts';

export const Broadcasts = () => {



  const { data: broadcasts, isLoading: broadcastLoading, error: broadcastError } = useBroadcasts();


  if (broadcastLoading) {
    return <div>Loading...</div>;
  }

  if ( broadcastError) {
    return <div>Error: {broadcastError.message}</div>;
  }

  return (
    <div>
      <header className='header-wrapper'>
        <h1>Lissen Directly</h1>
      </header>
      {broadcasts && broadcasts.map((broadcast: IBroadcast, index: number) => (
            <div key={index} className="m-4 p-4 border rounded shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-2">{broadcast.name}</h2>
              <p className="text-gray-700">{broadcast.description}</p>
              <p>Start Time: {new Date(parseInt(broadcast.localstarttime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
              <p>Stop Time: {new Date(parseInt(broadcast.localstoptime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
              <p>Publisher: {broadcast.publisher.name}</p>
              <p>Channel: {broadcast.channel.name}</p>
              <p>Live Audio URL: {broadcast.liveaudio.url}</p>
              <p>Mobile Live Audio URL: {broadcast.mobileliveaudio.url}</p>
            </div>
          ))}
      </div>

  );
};