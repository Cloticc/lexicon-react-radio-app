import { IProgram, IProgramCategory } from "../interface/Interface";

import { useQuery } from '@tanstack/react-query';

export const getProgramCategories = async () => {
  let page = 1;
  let totalPages = 1;
  let programCategories: IProgramCategory[] = [];

  while (page <= totalPages) {
    const response = await fetch(`https://api.sr.se/api/v2/programcategories?format=json&page=${page}&size=1000`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      programCategories = [...programCategories, ...data.programcategories];
      totalPages = data.pagination.totalpages;
    } else {
      throw new Error('No program categories found');
    }

    page++;
  }

  return programCategories;
};

export const useProgramCategories = (id: number) => {
  return useQuery({
    queryKey: ['programCategories', id],
    queryFn: () => getProgramCategories()
  });
};


export const getProgramsByCategory = async (selectedCategory: null | undefined) => {
  if (selectedCategory !== null) {
    let page = 1;
    let totalPages = 1;
    let allPrograms: IProgram[] = [];

    while (page <= totalPages) {
      /* TODO: Fix size thing use oberserver */
      const response = await fetch(`https://api.sr.se/api/v2/programs/index?programcategoryid=${selectedCategory}&format=json&page=${page}&size=1000`);
      const data = await response.json();
      // console.log(data.programs);

      if (data) {
        allPrograms = allPrograms.concat(data.programs);
        totalPages = data.pagination.totalpages;
      } else {
        throw new Error('No programs found for this category');
      }

      page++;
    }

    return allPrograms;
  }
};


export const useProgramsByCategory = (selectedCategory: null | undefined | number) => {
  return useQuery({
    queryKey: ['programs', selectedCategory],
    queryFn: () => getProgramsByCategory(selectedCategory as null | undefined),
    enabled: !!selectedCategory
  });
};

export const getProgram = async (id: number) => {
  const response = await fetch(`https://api.sr.se/api/v2/programs/index?channelid=${id}&format=json&size=1000`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  // console.log(data.programs); 

  if (data) {
    return data.programs; 
  }
  return [];
}

export const useProgram = (id: number) => {
  return useQuery({
    queryKey: ['program', id],
    queryFn: () => id ? getProgram(id) : Promise.resolve({}),
    enabled: !!id,
  });
}

