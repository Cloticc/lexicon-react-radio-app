import '../styles/Program.css';

import { ChangeEvent, useEffect, useState } from 'react';
import { Program, ProgramCategory } from '../interface/Interface';

import { Link } from 'react-router-dom';
import { fetchData } from '../api/fetchData';

// interface Sr {
//   copyright: string;
//   pagination: Pagination;
//   programs: Program[];
// }
export const ProgramComponent: React.FC = () => {
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



  // Social playforms list 
  const socialMediaPlatforms = (program: Program) => {
    return program.socialmediaplatforms.map(platform => (
      <li className='social-li' key={platform.platform}>
        <a href={platform.platformurl} target="_blank" rel="noreferrer">{platform.platform}</a>
      </li>
    ));
  }




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
              <Link to={`/program/${program.id}`}>

                <h2>{program.name} HUGE</h2>
              </Link>
              <img src={program.programimage} alt={program.name} />
              <h3>{program.channel.name}</h3>
              <p>{program.description}</p>
              <p>{program.broadcastinfo}</p>
              <p>Program URL: {program.programurl}</p>
              {/* <p>Email: {program.email}</p> */}
              {/* <p>Phone: {program.phone}</p> */}
              {/* <p>Has On Demand: {program.hasondemand ? 'Yes' : 'No'}</p> */}
              {/* <p>Has Podcast: {program.haspod ? 'Yes' : 'No'}</p> */}
              {/* <p>Responsible Editor: {program.responsibleeditor}</p> */}
              {/* <p>Program Category: {program.programcategory.name}</p> */}
              {/* <p>Payoff: {program.payoff}</p> */}
              {/* <p>Program Image Template: {program.programimagetemplate}</p> */}
              {/* <p>Program Image Wide: {program.programimagewide}</p> */}
              {/* <p>Program Image Template Wide: {program.programimagetemplatewide}</p> */}
              {/* <p>Social Image: {program.socialimage}</p> */}
              {/* <p>Social Image Template: {program.socialimagetemplate}</p> */}
              {/* <p>Social Media Platforms: {program.socialmediaplatforms.join(', ')}</p> */}
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

export { Program };
