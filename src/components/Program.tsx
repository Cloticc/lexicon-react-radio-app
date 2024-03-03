import { ChangeEvent, useState } from 'react';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useProgramCategories, useProgramsByCategory } from '../api/apiProgram';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="flex flex-col items-center space-y-4">
      <div className="space-y-4">
        <select className="form-select w-full" value={selectedCategory?.toString()} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {programCategories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <aside className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {programs?.map((program, index) => (
            <li key={`${program.id}-${index}`} className='border rounded-lg shadow-lg bg-white list-none p-4 space-y-4'>
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
            </li>
          ))}
        </aside>
      </div>
    </div>
  );
};