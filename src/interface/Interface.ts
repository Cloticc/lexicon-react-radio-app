
// interface Pagination {
//   page: number;
//   size: number;
//   totalhits: number;
//   totalpages: number;
//   nextpage: string;
// }
export interface SocialMediaPlatform {
  platform: string;
  platformurl: string;
}
export interface ProgramCategory {
  id: string;
  name: string;
}
export interface Channel {
  id: string;
  name: string;
}
export interface Program {
  id: string;
  name: string;
  description: string;
  programcategory: ProgramCategory;
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
  socialmediaplatforms: SocialMediaPlatform[];
  channel: Channel;
  archived: boolean;
  hasondemand: boolean;
  haspod: boolean;
  responsibleeditor: string;
}



// pod
export interface PodFile {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  published: string;
  program: Program;
}

// episode

export interface Episode {
  id: string;
  title: string;
  description: string;
  publishdateutc: string;
  url: string;
  imageurl: string;
  broadcast: Broadcast;
  listenpodfile: PodFile;
  downloadpodfile: PodFile;
  episodegroup: EpisodeGroup;
  availableuntilutc: string;
  
}