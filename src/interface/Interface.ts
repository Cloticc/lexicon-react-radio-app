

export interface ISocialMediaPlatform {
  platform: string;
  platformurl: string;
}

export interface IProgramCategory {
  id: string;
  name: string;
}

export interface IFavoriteItem {
  id: string;
  name: string;
  favorite: boolean;
type: string;

}

export interface IChannel extends IFavoriteItem {
  type: 'channel';
  program: string;
  id: string;
  name: string;
  image: string;
  tagline: string;
  siteurl: string;
  liveaudio: ILiveAudio;
  scheduleurl: string;
  channeltype: string;
  xmltvid: string;
  favorite: boolean;
}

export interface IProgram extends IFavoriteItem {
  type: 'program';
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
  favorite: boolean;
}
export type FavoriteItem = IChannel | IProgram;

export interface ILiveAudio {
  id: string;
  url: string;
  statkey: string;
}
export interface IBroadcast {
  id: string;
  name: string;
  sport: boolean;
  description: string;
  localstarttime: string;
  localstoptime: string;
  publisher: {
    id: string;
    name: string;
  };
  channel: {
    id: string;
    name: string;
  };
  liveaudio: {
    id: string;
    url: string;
    statkey: string;
  };
  mobileliveaudio: {
    id: string;
    url: string;
    statkey: string;
  };
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

export interface IEpisode {
  id: number;
  title: string;
  description: string;
  url: string;
  program: {
    id: number;
    name: string;
  };
  audiopreference: string;
  audiopresentation: string;
  audiopriority: string;
  publishdateutc: string;
  imageurl: string;
  imageurltemplate: string;
  photographer: string;
  broadcasttime: {
    starttimeutc: string;
    endtimeutc: string;
  };
  broadcast: {
    availablestoputc: string;
    broadcastfiles: {
      duration: number;
      publishdateutc: string;
      id: number;
      url: string;
      statkey: string;
    }[];
    playlist: {
      duration: number;
      publishdateutc: string;
      title: string;
      url: string;
    };
    channelid: number;
    description: string;
    publishdateutc: string;
    title: string;
  };
}

export interface ISr {
  copyright: string;
  episode: IEpisode;
}

export interface IEpisodeGroup {
  id: string;
  name: string;
}


export interface CombinedInterfaces {
  socialMediaPlatform: ISocialMediaPlatform;
  programCategory: IProgramCategory;
  channel: IChannel;
  liveAudio: ILiveAudio;
  program: IProgram;
  broadcast: IBroadcast;
  podFile: IPodFile;
  episode: IEpisode;
  sr: ISr;
  episodeGroup: IEpisodeGroup;
}



interface Program {
  id: number;
  name: string;
}

interface Podfile {
  availablefromutc: string;
  description: string;
  duration: number;
  filesizeinbytes: number;
  id: number;
  program: Program;
  publishdateutc: string;
  statkey: string;
  title: string;
  url: string;
}

interface BroadcastTime {
  endtimeutc: string;
  starttimeutc: string;
}

export interface ISearchEpisode {
  audiopreference: string;
  audiopresentation: string;
  audiopriority: string;
  broadcasttime: BroadcastTime;
  channelid: number;
  description: string;
  downloadpodfile: Podfile;
  id: number;
  imageurl: string;
  imageurltemplate: string;
  listenpodfile: Podfile;
  program: Program;
  publishdateutc: string;
  title: string;
  url: string;
}


