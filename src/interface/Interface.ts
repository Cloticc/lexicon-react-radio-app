export interface ISocialMediaPlatform {
  platform: string;
  platformurl: string;
}

export interface IProgramCategory {
  id: string;
  name: string;
}

export interface IChannel {
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
  favoirte: boolean;
}

export interface ILiveAudio {
  id: string;
  url: string;
  statkey: string;
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
  favoirte: boolean;
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
