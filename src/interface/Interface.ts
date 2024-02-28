
// interface Pagination {
//   page: number;
//   size: number;
//   totalhits: number;
//   totalpages: number;
//   nextpage: string;
// }
export interface ISocialMediaPlatform {
  platform: string;
  platformurl: string;
}
export interface IProgramCategory {
  id: string;
  name: string;
}
export interface IChannel {
  id: string;
  name: string;
}
export interface IProgram {
  id: string;
  name: string;
  description: string;
  programcategory: IProgramCategory;
  payoff: string;
  broadcastinfo: string;
  email: string;
  phone: string;
  programurl: string;
  programimage: string;
  programimagetemplate: string;
  programimagewide: string;
  programimagetemplatewide: string;
  socialimage: string;
  socialimagetemplate: string;
  socialmediaplatforms: ISocialMediaPlatform[];
  channel: IChannel;
  archived: boolean;
  hasondemand: boolean;
  haspod: boolean;
  responsibleeditor: string;
}


export interface ISr {
  copyright: string;
  episode: IEpisode;
}

export interface IEpisode {
  broadcastfiles: any;
  episodegroup: any;
  availableuntilutc: any;
  id: string;
  title: string;
  description: string;
  text: string;
  url: string;
  program: IProgram;
  publishdateutc: string;
  imageurl: string;
  imageurltemplate: string;
  listenpodfile: IPodFile;
  downloadpodfile: IPodFile;
  relatedepisodes: any; 
  episodegroups: IEpisodeGroup[];
}

export interface IProgram {
  id: string;
  name: string;
}

export interface IPodFile {
  id: string;
  url: string;
  statkey: string;
  duration: number;
  publishdateutc: string;
  title: string;
  description: string;
  filesizeinbytes: number;
  program: IProgram;
}

export interface IEpisodeGroup {
  id: string;
  name: string;
}


export interface ILiveAudio {
  id: string;
  url: string;
  statkey: string;
}

export interface IChannel {
  id: string;
  name: string;
  image: string;
  tagline: string;
  siteurl: string;
  liveaudio: ILiveAudio;
  scheduleurl: string;
  channeltype: string;
  xmltvid: string;
}


