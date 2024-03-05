import { Calander } from './Calander';
import { useBroadcasts } from '../api/apiBroadcasts';

// import { IBroadcast } from '../interface/Interface';


export const Broadcasts = () => {
  const { data: broadcasts, isLoading: broadcastLoading, error: broadcastError } = useBroadcasts();

  // console.log(broadcasts);

  if (broadcastLoading) {
    return <div>Loading...</div>;
  }

  if (broadcastError) {
    return <div>Error: {broadcastError.message}</div>;
  }

  return <Calander broadcasts={broadcasts} />;
}

//   return (
//     // <div classNameName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//     //   {broadcasts &&
//     //     broadcasts.map((broadcast: IBroadcast, index: number) => (
//     //       <div key={index} classNameName="m-4 p-4 border rounded shadow-lg bg-white">
//     //         <header>
//     //           <h2 classNameName="text-2xl font-bold mb-2">{broadcast.name}</h2>
//     //           <p classNameName="text-gray-700">{broadcast.description}</p>
//     //           <p>Start tid: {new Date(parseInt(broadcast.localstarttime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
//     //           <p>Slut tid: {new Date(parseInt(broadcast.localstoptime.replace(/[^0-9 +]/g, ''))).toLocaleString('eu', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}</p>
//     //           <p>Kanal: <a href={broadcast.liveaudio.url} target="_blank" rel="noopener noreferrer">{broadcast.channel.name}</a></p>
//     //           <p>Utgivare: {broadcast.publisher.name}</p>
//     //           <audio>

//     //             <source src={broadcast.liveaudio.url} type="audio/mpeg" />
//     //             Your browser does not support the audio element.

//  < Calander />

//     //           </audio>
//     //         </header>
//     //       </div>
//     //     ))}

//     // </div>

 

//   );
// }

