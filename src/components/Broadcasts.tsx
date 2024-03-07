import { Calander } from './Calander';
import { useBroadcasts } from '../api/apiBroadcasts';
import { useState } from 'react';

// import { useChannelSchedule } from '../api/apiChannel';


export const Broadcasts = () => {
  const { data: broadcasts, isLoading: broadcastLoading, error: broadcastError } = useBroadcasts();
  


  const [isShown, setIsShown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);



  if (broadcastLoading) {
    return <div>Loading...</div>;
  }

  if (broadcastError ) {
    // return <div>Error: {broadcastError.message}</div>;
    return <div>Error</div>;
  }

  const handleTransitionEnd = () => {
    if (!isShown) {
      setIsAnimating(false);
    }
  };

  const handleClick = () => {
    if (isShown) {
      setIsAnimating(true);
    }
    setIsShown(!isShown);
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleClick} className='bg-blue-500 text-white p-2 rounded-md'>
        {isShown ? 'Göm kalender' : 'Visa kalender'}
      </button>
      <div className={`transition-transform duration-500 ease-in-out transform ${isShown ? 'translate-x-0' : '-translate-x-full'}`} onTransitionEnd={handleTransitionEnd}>
        {(isShown || isAnimating) && <Calander broadcasts={broadcasts}  />}
         
      </div>
    </div>
  );
}

// return (
//   <div>
//     <button onClick={() => setIsShown(!isShown)}>
//       {isShown ? 'Hide Calendar' : 'Show Calendar'}
//     </button>
//     <div className={`transition-transform duration-500 ease-in-out transform ${isShown ? 'translate-x-0' : '-translate-x-full'}`}>
//       <Calander broadcasts={broadcasts} />
//     </div>
//   </div>
// );
// }
