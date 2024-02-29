
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
interface IEpisode {
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

// interface IEpisode {
//   id: number;
//   title: string;
//   description: string;
//   url: string;
//   program: {
//     id: number;
//     name: string;
//   };
//   audioPreference: string;
//   audioPriority: string;
//   audioPresentation: string;
//   publishDateUTC: string;
//   imageUrl: string;
//   imageUrlTemplate: string;
//   photographer: string;
//   broadcastTime: {
//     startTimeUTC: string;
//     endTimeUTC: string;
//   };
//   listenPodfile: {
//     id: number;
//     url: string;
//     statKey: string;
//     duration: number;
//     publishDateUTC: string;
//     title: string;
//     description: string;
//     fileSizeInBytes: number;
//     program: {
//       id: number;
//       name: string;
//     };
//     availableFromUTC: string;
//   };
//   downloadPodfile: {
//     id: number;
//     url: string;
//     statKey: string;
//     duration: number;
//     publishDateUTC: string;
//     title: string;
//     description: string;
//     fileSizeInBytes: number;
//     program: {
//       id: number;
//       name: string;
//     };
//     availableFromUTC: string;
//   };
// }


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


