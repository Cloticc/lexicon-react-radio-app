import '../styles/Program.css';

import { ChangeEvent, useState } from 'react';
import { IProgram, IProgramCategory } from '../interface/Interface';

import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const ProgramComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = Number(event.target.value);
    setSelectedCategory(selectedCategory);
  };

  const fetchProgramCategories = async () => {
    let page = 1;
    let totalPages = 1;
    let programCategories: IProgramCategory[] = [];

    while (page <= totalPages) {
      const response = await fetch(`http://api.sr.se/api/v2/programcategories?format=json&page=${page}`);
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

  
const { data: programCategories, isLoading, error } = useQuery({
  queryKey: ['programCategories'],
  queryFn: fetchProgramCategories
});

  const fetchPrograms = async () => {
    if (selectedCategory !== null) {
      let page = 1;
      let totalPages = 1;
      let allPrograms: IProgram[] = [];

      while (page <= totalPages) {
        const response = await fetch(`https://api.sr.se/api/v2/programs/index?programcategoryid=${selectedCategory}&format=json&page=${page}`);
        const data = await response.json();
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


  const { data: programs, isLoading: programsLoading, error: programsError } = useQuery({
    queryKey: ['programs', selectedCategory],
    queryFn: fetchPrograms,
    enabled: !!selectedCategory
  });

  
  // Social platforms list 
  const socialMediaPlatforms = (program: IProgram) => {
    return program.socialmediaplatforms.map(platform => (
      <li className='social-li' key={platform.platform}>
        <a href={platform.platformurl} target="_blank" rel="noreferrer">{platform.platform}</a>
      </li>
    ));
  }

  if (isLoading || programsLoading) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || programsError) {
    return (
      <div className="Program">
        <h2>Programs</h2>
        <p>{error?.message || programsError?.message}</p>
      </div>
    );
  }

  return (
    <div className="Program">
      <h2>Programs</h2>
      <>
        <select value={selectedCategory?.toString()} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {programCategories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <aside className='program-channels-wrapper'>
          {programs?.map((program, index) => (
            <li key={`${program.id}-${index}`} className='program-card'>
              <Link to={`/program/${program.id}`}>
                <h2>{program.name} HUGE</h2>
              </Link>
              <img src={program.programimage} alt={program.name} />
              <h3>{program.channel.name}</h3>
              <p>{program.description}</p>
              <p>{program.broadcastinfo}</p>
              <p>Program URL: {program.programurl}</p>
              <ul className='social-ul'>
                {socialMediaPlatforms(program)}
              </ul>
              <p>Archived: {program.archived ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </aside>
      </>
    </div>
  );
};