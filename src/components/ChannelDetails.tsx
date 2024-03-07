import {
  IProgram,
  ISearchEpisode,
} from "../interface/Interface";
import { Link, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useEffect, useState } from "react";

import { WeeklyCalendar } from "./CalanderList";
import { useChannelSchedule } from "../api/apiChannel";
import { useProgram } from "../api/apiProgram";
import { useSearchEpisodes } from "../api/apiEpisode";

export const ChannelDetails = () => {
  const { name, channelId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data: searchEpisode, isLoading: searchEpisodeLoading, error: searchEpisodeError, } = useSearchEpisodes(name || "");

  const { data: programs, isLoading: programsLoading, error: programsError } = useProgram(channelId ? parseInt(channelId) : 0);
  // console.log(channelId);
  // useChannelSchedule

  // const channelScheduleQueryResult = useChannelSchedule(channelId ? parseInt(channelId) : 0);
  // const channelSchedule = channelScheduleQueryResult[0]?.data;
  const channelScheduleResults = useChannelSchedule(channelId ? parseInt(channelId) : 0);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };




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
    }, timeUntilMidnight);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [currentDate]); // Only re-run the effect if the date changes

  currentDate.setHours(0, 0, 0, 0); // to ignore time part of the date when comparing dates later


  if (searchEpisodeLoading || programsLoading) {
    return <div>Loading...</div>;
  }

  if (searchEpisodeError || programsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Tabs className="flex flex-col">
      <TabList className="flex space-x-4 mt-5">
        <Tab selectedClassName="bg-blue-500" className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Sändningar
        </Tab>
        <Tab selectedClassName="bg-blue-500" className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Program
        </Tab>
        <Tab selectedClassName="bg-blue-500" className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Kalender

        </Tab>
      </TabList>
      <TabPanel className='mt-5' >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchEpisode && searchEpisode.length > 0 ? (
            searchEpisode
              .sort(
                (
                  a: { publishdateutc: string },
                  b: { publishdateutc: string }
                ) =>
                  parseInt(
                    b.publishdateutc.substring(6, b.publishdateutc.length - 2)
                  ) -
                  parseInt(
                    a.publishdateutc.substring(6, a.publishdateutc.length - 2)
                  )
              )
              .map((episode: ISearchEpisode) => {
                return (
                  <div
                    key={episode.id}
                    className="max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-md overflow-hidden md:max-w-auto"
                  >
                    <div>
                      <img
                        src={episode.imageurl}
                        alt={episode.title || "No title"}
                        className="w-full h-64 rounded"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
                        {episode.title || "No title"}
                      </h3>
                      <p className="mt-2 text-gray-300">
                        {episode.description || "No description"}
                      </p>
                      <p className="mt-2 text-gray-300">
                        Publicerad:{" "}
                        {episode.publishdateutc
                          ? new Date(
                            parseInt(
                              episode.publishdateutc.substring(
                                6,
                                episode.publishdateutc.length - 2
                              )
                            )
                          ).toLocaleDateString("en-GB")
                          : "No publish date"}
                      </p>
                      <p className="text-gray-300">
                        Sändningstid:{" "}
                        {episode.broadcasttime
                          ? `${new Date(
                            parseInt(
                              episode.broadcasttime.starttimeutc.substring(
                                6,
                                episode.broadcasttime.starttimeutc.length - 2
                              )
                            )
                          ).toLocaleTimeString("en-GB")} - ${new Date(
                            parseInt(
                              episode.broadcasttime.endtimeutc.substring(
                                6,
                                episode.broadcasttime.endtimeutc.length - 2
                              )
                            )
                          ).toLocaleTimeString("en-GB")}`
                          : "Igen sändningstid"}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <a
                          href={episode.url || "#"}
                          className="mt-2 text-blue-400 hover:underline"
                        >
                          {episode.program?.name || "No program name"} Link
                        </a>
                        <a
                          href={episode.downloadpodfile?.url || "#"}
                          className="mt-2 text-blue-400 hover:underline"
                        >
                          Ladda ner
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-red-500 text-2xl">Inga avsnitt tillgängliga</div>
          )}
        </div>
      </TabPanel>
      <TabPanel>
        {/* program related to the channel */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs?.map((program: IProgram) => {
            return (
              <div
                key={program.id}
                className="max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-md overflow-hidden md:max-w-auto"
              >
                <div>
                  <img
                    src={program.programimage}
                    alt={program.name}
                    className="w-full h-64 object-cover mt-2 rounded"
                  />

                </div>
                <div className="p-8">
                  <h3 className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
                    {program.name}
                  </h3>
                  <p className="mt-2 text-gray-300">{program.description}</p>
                  <p className="mt-2 text-gray-300">{program.broadcastinfo}</p>
                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={program.programurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-blue-400 hover:underline"
                    >
                      Besök sida
                    </a>
                    <Link
                      to={`/programs/program/${program.id}`}
                      className="mt-2 text-blue-400 hover:underline"
                    >
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

        {/* <WeeklyCalendar channelSchedule={channelSchedule} /> */}
        <WeeklyCalendar channelScheduleResults={channelScheduleResults} />
      </TabPanel>
      {isVisible && (
        <div onClick={scrollToTop} className='z-50 scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
          ↑
        </div>
      )}
    </Tabs>
  );
};
