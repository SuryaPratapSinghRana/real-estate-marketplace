import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold text-lg sm:text-2xl flex items-center gap-1'>
            <span className='text-blue-600 dark:text-blue-400'>vansh</span>
            <span className='text-gray-800 dark:text-gray-200'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-gray-100 dark:bg-gray-700 p-2 rounded-xl flex items-center shadow-sm hover:shadow-md transition-shadow'
        >
          <input
            type='text'
            placeholder='Search properties...'
            className='bg-transparent focus:outline-none w-32 sm:w-72 md:w-96 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors'>
            <FaSearch className='text-gray-600 dark:text-gray-300' />
          </button>
        </form>
        <ul className='flex items-center gap-6'>
          <Link to='/'>
            <li className='hidden sm:inline text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <div className='relative'>
                <img
                  className='rounded-full h-9 w-9 object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-colors'
                  src={currentUser.avatar}
                  alt='profile'
                />
                <span className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800'></span>
              </div>
            ) : (
              <li className='text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}