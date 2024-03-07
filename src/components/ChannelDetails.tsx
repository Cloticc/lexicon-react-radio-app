import { IProgram, IScheduleEpisode, ISearchEpisode } from "../interface/Interface";
import { Link, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useEffect, useState } from "react";

import { useChannelSchedule } from "../api/apiChannel";
import { useProgram } from "../api/apiProgram";
import { useSearchEpisodes } from "../api/apiEpisode";

export const ChannelDetails = () => {

  const { name, channelId } = useParams();

  const { data: searchEpisode, isLoading: searchEpisodeLoading, error: searchEpisodeError } = useSearchEpisodes(name || "");

  const { data: programs, isLoading: programsLoading, error: programsError } = useProgram(channelId ? parseInt(channelId) : 0);
  // console.log(channelId);
  // useChannelSchedule
  const { data: channelSchedule, isLoading: channelScheduleLoading, error: channelScheduleError } = useChannelSchedule(channelId ? parseInt(channelId) : 0);


  // try do usechanneklsecule to get the schedule for the channel log it
  console.log(channelSchedule);

  const [currentDate, setCurrentDate] = useState(new Date());

  /* The `useEffect` hook in the provided code is responsible for updating the `currentDate` state at
  midnight each day. Here's a breakdown of what the `useEffect` block is doing: */
  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const timeUntilMidnight = nextDay.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
      /**
       * The code defines functions to fetch and return the schedule of a specific channel using the Sveriges
       * Radio API in a TypeScript React application.
       * @param {number} id - The `id` parameter in the `getChannelSchedule` and `useChannelSchedule`
       * functions is used to specify the channel ID for which you want to retrieve the schedule. This ID is
       * used in the API request to fetch the schedule data for the specified channel.
       * @returns The `useChannelSchedule` function is returning the result of a `useQuery` hook that queries
       * the channel schedule data using the `getChannelSchedule` function for a specific channel ID.
       */
    }, timeUntilMidnight);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [currentDate]); // Only re-run the effect if the date changes

  currentDate.setHours(0, 0, 0, 0); // to ignore time part of the date when comparing dates later



  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let key = 0;
  const rows = [];

  let cells = [];

  // Generate empty cells to align the starting day of the month hopefully work gotta see next month
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<td key={`empty-${i}`} className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10"></td>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const today = new Date();
    const isToday = i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

    // let dayBroadcasts = [];
    // if (channelSchedule) {
    //   dayBroadcasts = channelSchedule.filter((channelSchedule: IScheduleEpisode) => {
    //     const startTimeMilliseconds = parseInt(channelSchedule.starttimeutc.replace(/[^0-9 +]/g, ''));
    //     const broadcastDate = new Date(startTimeMilliseconds);
    //     const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    //     return broadcastDate.getFullYear() === cellDate.getFullYear() &&
    //       broadcastDate.getMonth() === cellDate.getMonth() &&
    //       broadcastDate.getDate() === cellDate.getDate();
    //   });
    // }

    let dayBroadcasts = [];
    if (channelSchedule) {
      const now = new Date();
      dayBroadcasts = channelSchedule.filter((channelSchedule: IScheduleEpisode) => {
        const startTimeMilliseconds = parseInt(channelSchedule.starttimeutc.replace(/[^0-9 +]/g, ''));
        const endTimeMilliseconds = parseInt(channelSchedule.endtimeutc.replace(/[^0-9 +]/g, ''));
        const broadcastDate = new Date(startTimeMilliseconds);
        const endDate = new Date(endTimeMilliseconds);
        const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        return broadcastDate.getFullYear() === cellDate.getFullYear() &&
          broadcastDate.getMonth() === cellDate.getMonth() &&
          broadcastDate.getDate() === cellDate.getDate() &&
          endDate > now;
      });
    }



    cells.push(
      <td key={i} className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition-all duration-500 ease ${isToday ? 'bg-gray-100 text-white' : 'hover:bg-gray-300'} hover:h-auto`}>
        <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden hover:h-auto">
          <div className="top h-5 w-full">
            <span className="text-gray-500">{i}</span>
          </div>
          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer overflow-auto hover:h-auto">
            {dayBroadcasts.map((channelSchedule: IScheduleEpisode, index: number) => (
              <div key={index} className="event bg-purple-400 text-white rounded p-1 text-sm mb-1" onClick={() => window.open(channelSchedule.program.programurl, '_blank')}>
                <span>{channelSchedule.title}</span>
                <br />
                <span className="">{new Date(parseInt(channelSchedule.starttimeutc.replace(/[^0-9 +]/g, ''))).toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric', hour12: false })}</span>
              </div>
            ))}
          </div>
        </div>
      </td>
    );

    // If we have added 7 cells or it's the last day of the month, push the current row and reset cells
    if (cells.length === 7 || i === daysInMonth) {
      rows.push(<tr key={key++} className="text-center h-20">{cells}</tr>);
      cells = []; // Reset cells array for the next row
    }
  }
  const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  const shortDays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];




  if (searchEpisodeLoading || programsLoading || channelScheduleLoading) {
    return <div>Loading...</div>;
  }

  if (searchEpisodeError || programsError || channelScheduleError) {
    return <div>Error fetching data</div>;
  }



  return (

    <Tabs className="flex flex-col">
      <TabList className="flex mb-4">
        <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Sändningar</Tab>
        <Tab className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Program</Tab>
        <Tab className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Kalender</Tab>
      </TabList>
      <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchEpisode && searchEpisode.length > 0 ? (
            searchEpisode.sort((a: { publishdateutc: string; }, b: { publishdateutc: string; }) => parseInt(b.publishdateutc.substring(6, b.publishdateutc.length - 2)) - parseInt(a.publishdateutc.substring(6, a.publishdateutc.length - 2))).map((episode: ISearchEpisode) => {
              return (
                <div key={episode.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-auto">
                  <div>
                    <img className="w-full object-contain" src={episode.imageurl || ""} alt={episode.title || "No title"} />
                  </div>
                  <div className="p-8">
                    <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{episode.title || "No title"}</h3>
                    <p className="mt-2 text-gray-500">{episode.description || "No description"}</p>
                    <p className="mt-2 text-gray-500">

                      Publicerad: {episode.publishdateutc ? new Date(parseInt(episode.publishdateutc.substring(6, episode.publishdateutc.length - 2))).toLocaleDateString('en-GB') : "No publish date"}
                    </p>
                    <p>
                      Sändningstid: {episode.broadcasttime ? `${new Date(parseInt(episode.broadcasttime.starttimeutc.substring(6, episode.broadcasttime.starttimeutc.length - 2))).toLocaleTimeString('en-GB')} - ${new Date(parseInt(episode.broadcasttime.endtimeutc.substring(6, episode.broadcasttime.endtimeutc.length - 2))).toLocaleTimeString('en-GB')}` : "Igen sändningstid"}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <a href={episode.url || "#"} className="mt-2 text-indigo-500 hover:underline">{episode.program?.name || "No program name"} Link</a>
                      <a href={episode.downloadpodfile?.url || "#"} className="mt-2 text-indigo-500 hover:underline">Ladda ner</a>
                    </div>
                  </div>
                </div>
              );
            }
            )
          ) : (
            <div>Inga avsnitt tillgängliga</div>
          )}
        </div>

      </TabPanel>
      <TabPanel>
        {/* program related to the channel */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {programs?.map((program: IProgram) => {
            return (
              <div key={program.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-auto">
                <div>
                  <img className="h-48 w-full object-cover" src={program.programimagetemplate.replace("{?}", "400x400")} alt={program.name} />
                </div>
                <div className="p-8">
                  <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{program.name}</h3>
                  <p className="mt-2 text-gray-500">{program.description}</p>
                  <p className="mt-2 text-gray-500">{program.broadcastinfo}</p>
                  <div className="flex justify-between items-center mt-4">
                    <a href={program.programurl} target="_blank" rel="noopener noreferrer" className="mt-2 text-indigo-500 hover:underline">
                      Besök sida
                    </a>
                    <Link to={`/programs/program/${program.id}`} className="mt-2 text-indigo-500 hover:underline">
                      Länk till detaljer
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </TabPanel>
      <TabPanel>
        <div>Tab 3</div>


        <div className="bg-gray-200">
          <div className="wrapper bg-white rounded shadow w-full ">
            <div className="header flex justify-between border-b p-2">
              <span className="text-lg font-bold uppercase">
                {currentDate.toLocaleString('sv-SE', { month: 'long' })} {currentDate.getFullYear()}
              </span>
              <div className="buttons">
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {days.map((_day, index) => (
                    <th key={index} className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                      <span className="xl:block lg:block md:block sm:block hidden">{days[index]}</span>
                      <span className="xl:hidden lg:hidden md:hidden sm:hidden block">{shortDays[index]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>

        </div>






      </TabPanel>

    </Tabs>

  );
}




