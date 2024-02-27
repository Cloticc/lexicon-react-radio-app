import '../styles/Program.css';

import { ChangeEvent, useEffect, useState } from 'react';

import { fetchData } from '../api/fetchData';

// import React from 'react';



interface Pagination {
  page: number;
  size: number;
  totalhits: number;
  totalpages: number;
  nextpage: string;
}

interface SocialMediaPlatform {
  platform: string;
  platformurl: string;
}

interface ProgramCategory {
  id: string;
  name: string;
}

interface Channel {
  id: string;
  name: string;
}

interface Program {
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

interface Sr {
  copyright: string;
  pagination: Pagination;
  programs: Program[];
}
export const Program: React.FC = () => {
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);





  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = Number(event.target.value);
    setSelectedCategory(selectedCategory);
    setPrograms([]);
    
  };


  useEffect(() => {
    const fetchProgramCategories = async () => {
      let page = 1;
      let totalPages = 1;
      let programCategories: ProgramCategory[] = [];

      while (page <= totalPages) {
        const { data, isLoading, error } = await fetchData(`programcategories?format=json&page=${page}`);

        // console.log('Data:', data);
        // console.log('Loading:', isLoading);
        // console.log('Error:', error);

        if (data) {
          programCategories = [...programCategories, ...data.programcategories];
          totalPages = data.pagination.totalpages;
        } else {
          setError('No program categories found');
        }

        setIsLoading(isLoading);
        if (error) {
          setError(error);
        }

        page++;
      }

      setProgramCategories(programCategories);
    };

    fetchProgramCategories();
  }, []);

useEffect(() => {
  const fetchPrograms = async () => {
    if (selectedCategory !== null) {
      setIsLoading(true);
      let page = 1;
      let totalPages = 1;
      let allPrograms: Program[] = [];

      while (page <= totalPages) {
        try {
          const response = await fetch(`https://api.sr.se/api/v2/programs/index?programcategoryid=${selectedCategory}&format=json&page=${page}`);
          const data = await response.json();

          if (data) {
            allPrograms = allPrograms.concat(data.programs);
            totalPages = data.pagination.totalpages;
          } else {
            setError('No programs found for this category');
            break;
          }
        } catch (error) {
          setError(`An error occurred: ${error}`);
          break;
        }

        page++;
      }

      setPrograms(allPrograms);
      setIsLoading(false);
    }
  };

  fetchPrograms(); 
}, [selectedCategory]);


  if (isLoading) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="Program">
      <h2>Programs</h2>
      <>
        <select value={selectedCategory?.toString()} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {programCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
           <aside className='program-channels-wrapper'>
          {programs.map((program, index) => (
            <li key={`${program.id}-${index}`} className='program-card'>
              <img src={program.programimage} alt={program.name} />
              <h3>{program.channel.name}</h3>
              <p>{program.description}</p>
              <p>{program.broadcastinfo}</p>
            </li>
          ))}
        </aside>
      </>

    </div>
  );
};