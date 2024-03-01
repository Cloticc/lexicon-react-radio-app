import { ChangeEvent, useState } from 'react';
import { useProgramCategories, useProgramsByCategory } from '../api/apiProgram';

import { IProgram } from '../interface/Interface';
import { Link } from 'react-router-dom';

export const ProgramComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null | undefined>(null);
  const { data: programCategories, isLoading, error } = useProgramCategories(1);
  const { data: programs, isLoading: programsLoading, error: programsError } = useProgramsByCategory(selectedCategory);
  
  
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedCategory: number | null = Number(event.target.value);
      setSelectedCategory(selectedCategory ? selectedCategory : null);
    };
  
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Programs</h2>
      <div>
        <select className="form-select block w-full mt-1" value={selectedCategory?.toString()} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {programCategories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <aside className='mt-4 grid grid-cols-3 gap-4'>
          {programs?.map((program, index) => (
            <li key={`${program.id}-${index}`} className='p-4 border rounded-lg shadow-lg bg-white'>
              <Link className="text-blue-500 hover:underline" to={`/program/${program.id}`}>
                <h2 className="text-xl font-bold">{program.name} HUGE</h2>
              </Link>
              <img className="w-full h-64 object-cover mt-2 rounded" src={program.programimage} alt={program.name} />
              <div className="p-4">
                <h3 className="text-lg font-semibold mt-2">{program.channel.name}</h3>
                <p className="mt-2">{program.description}</p>
                <p className="mt-2">{program.broadcastinfo}</p>
                <p className="mt-2">Program URL: <a className="text-blue-500 hover:underline" href={program.programurl}>{program.programurl}</a></p>
                <ul className='mt-2'>
                  {socialMediaPlatforms(program)}
                </ul>
                <p className="mt-2">Archived: <span className="font-bold">{program.archived ? 'Yes' : 'No'}</span></p>
              </div>
            </li>
          ))}
        </aside>
      </div>
    </div>
  );
};