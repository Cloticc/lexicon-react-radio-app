import { IProgram, ISearchEpisode } from "../interface/Interface";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { useParams } from "react-router-dom";
import { useProgram } from "../api/apiProgram";
import { useSearchEpisodes } from "../api/apiEpisode";

export const ChannelDetails = () => {

  const { name, channelId } = useParams();

  const { data: searchEpisode, isLoading: searchEpisodeLoading, error: searchEpisodeError } = useSearchEpisodes(name || "");

  const { data: programs, isLoading: programsLoading, error: programsError } = useProgram(channelId ? parseInt(channelId) : 0);
  // console.log(channelId);


  if (searchEpisodeLoading || programsLoading) {
    return <div>Loading...</div>;
  }

  if (searchEpisodeError || programsError) {
    return <div>Error fetching data</div>;
  }



  return (

    <Tabs className="flex flex-col">
      <TabList className="flex mb-4">
        <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Sändningar</Tab>
        <Tab className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Program</Tab>
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

                      Publicerad på: {episode.publishdateutc ? new Date(parseInt(episode.publishdateutc.substring(6, episode.publishdateutc.length - 2))).toLocaleDateString('en-GB') : "No publish date"}
                    </p>
                    <p>
                      Sändningstid: {episode.broadcasttime ? `${new Date(parseInt(episode.broadcasttime.starttimeutc.substring(6, episode.broadcasttime.starttimeutc.length - 2))).toLocaleTimeString('en-GB')} - ${new Date(parseInt(episode.broadcasttime.endtimeutc.substring(6, episode.broadcasttime.endtimeutc.length - 2))).toLocaleTimeString('en-GB')}` : "Igen sändningstid"}
                    </p>
                    <a href={episode.url || "#"} className="mt-2 text-indigo-500 hover:underline">{episode.program?.name || "No program name"} Link</a>
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
                </div>
              </div>
            );
          })}
        </div>

      </TabPanel>
    </Tabs>

  );
}




