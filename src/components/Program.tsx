import { ChangeEvent, useContext, useState } from 'react';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useProgramCategories, useProgramsByCategory } from '../api/apiProgram';

import { FavoriteContext } from '../context/ContexProvider'; // Adjust the path to match your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProgram } from '../interface/Interface';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const ProgramComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null | undefined>(null);
  const { data: programCategories, isLoading, error } = useProgramCategories(1);
  const { data: programs, isLoading: programsLoading, error: programsError } = useProgramsByCategory(selectedCategory);
  const { addFavorite } = useContext(FavoriteContext);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory: number | null = Number(event.target.value);
    setSelectedCategory(selectedCategory ? selectedCategory : null);
  };


  // Social platforms list 
  const socialMediaPlatforms = (program: IProgram) => {
    return program.socialmediaplatforms.map(platform => {
      let icon;
      switch (platform.platform.toLowerCase()) {
        case 'facebook':
          icon = faFacebook;
          break;
        case 'twitter':
          icon = faTwitter;
          break;
        case 'instagram':
          icon = faInstagram;
          break;
        default:
          icon = null;
      }

      return (
        <li className='social-li' key={platform.platform}>
          <a href={platform.platformurl} target="_blank" rel="noreferrer">
            {icon && <FontAwesomeIcon icon={icon} className="mr-1" />}
            {platform.platform}
          </a>
        </li>
      );
    });
  }
  if (isLoading || programsLoading) {
    return <div>Loading...</div>;
  }

  if (error || programsError) {
    return <div>Error fetching data</div>;
  }


  return (
    <>
      <div className=" items-center justify-center space-y-4 ">
        <div className="space-y-4">
          <div className="w-64 mx-auto mt-4">
            <select className="form-select w-full h-10 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={selectedCategory?.toString()} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              {programCategories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='container mx-auto p-4'>
        <aside className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg'>
          {programs?.map((program, index) => (
            <li key={`${program.id}-${index}`} className='relative border rounded-lg shadow-lg bg-black list-none p-4 space-y-4 text-white'>
              <img className="w-full h-64 object-cover mt-2 rounded" src={program.programimage} alt={program.name} />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{program.name}</h3>
                <p>{program.description}</p>
                <p>{program.broadcastinfo}</p>

                <p>SR Url: <a className="font-bold  text-blue-500" href={program.programurl}>Link</a></p>
                <ul className='space-y-2 text-blue-500'>
                  {socialMediaPlatforms(program)}
                </ul>
                <p>Arkiverad: <span className="font-bold">{program.archived ? 'Ja' : 'Nej'}</span></p>
              </div>
              <Link className="text-blue-500 hover:underline" to={`/programs/program/${program.id}`}>
                <h2 className="text-xl font-bold">Länk till detaljer</h2>
              </Link>
              <button onClick={() => addFavorite({ ...program, type: 'program' })} className="absolute top-0 right-0 m-2 ">
                <FontAwesomeIcon icon={faStar} color='yellow' />
              </button>
            </li>
          ))}
        </aside>
      </div>



    </>

  );
};