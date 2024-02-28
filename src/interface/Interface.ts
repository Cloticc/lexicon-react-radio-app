
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



// pod
export interface IPodFile {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  published: string;
  program: Program;
}

// episode

export interface IEpisode {
  id: string;
  title: string;
  description: string;
  publishdateutc: string;
  url: string;
  imageurl: string;
  broadcast: string;
  listenpodfile: PodFile;
  downloadpodfile: PodFile;
  episodegroup: string;
  availableuntilutc: string;
}

