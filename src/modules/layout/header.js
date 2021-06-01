import { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../services/authService'
import Logo from '../../assets/images/KL-logo.png'
import { useEffect } from 'react'
import LogoName from '../../assets/images/KL-logo-name.png'
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon
} from '@heroicons/react/outline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const customStyles = (offset) => {
  return {
    backgroundColor: `${offset === 0 ? 'transparent' : 'rgba(81,54,84,1)'}`,
    color: '#A5924B',
  }
}

const Header = () => {
  const { getUser } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const handleLogout = () => {
    removeToken()
    window.location.href = '/'
  }

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
    return function cleanupListener() {
      window.removeEventListener('onscroll', window)
    }
  }, []);

  return (
    <Popover className='fixed w-full z-50' style={customStyles(offset)}>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 py-2 sm:px-6'>
            <div className='flex justify-between items-center border-b-2 border-transparent py-1 md:justify-start md:space-x-10'>
              <div className='flex justify-start lg:w-0 lg:flex-1'>
                <Link to='/' className='flex items-center'>
                  <span className='sr-only'>Workflow</span>
                  <img
                    className='w-auto sm:h-10'
                    src={Logo}
                    style={{ height: '30px' }}
                    alt=''
                  />
                  <img
                    className='w-auto '
                    src={LogoName}
                    style={{ height: '20px' }}
                    alt=''
                  />
                </Link>
              </div>

              {/* mobile toggle */}
              <div className='-mr-2 -my-2 md:hidden'>
                <Popover.Button style={{ backgroundColor: 'transparent' }} className='bg-opacity-70 rounded-md p-2 inline-flex items-center justify-center hover:text-yellow-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              {/* mobile toggle */}

              <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
                <Link to='/courses' className='text-xs font-bold hover:text-yellow-500 ml-6'>
                  所有課程
                  </Link>

                {getUser().id != null ?
                  <>
                    <Link to='/my-courses' className='text-xs font-bold hover:text-yellow-500 ml-6'>
                      我的課程
                  </Link>
                    <Link to={`/user/${getUser().id}`} className='hover:text-yellow-500 ml-6'>
                      <AccountCircleIcon className='text-xl' />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='text-xs font-bold hover:text-yellow-500 ml-6'>
                      <span>登出</span>
                    </button>
                  </>
                  :
                  <>
                    <Link to='/signup' className='whitespace-nowrap text-xs font-bold hover:text-yellow-500 ml-6'>
                      注冊
                  </Link>
                    <Link
                      to='/login'
                      className='text-xs font-bold hover:text-yellow-500 ml-6'
                    >
                      登入
                  </Link>
                  </>
                }
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              static
              className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
            >
              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
                <div className='py-3 px-5 space-y-6'>
                  <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                    <Link to='/courses' className='text-xs text-center font-medium text-gray-900 hover:text-gray-700'>
                      所有課程
                      </Link>

                    <Link to='/courses' className='text-xs text-center font-medium text-gray-900 hover:text-gray-700'>
                      我的課程
                      </Link>
                  </div>
                  {
                    !getUser().id ?
                      (
                        <button
                          onClick={handleLogout}
                          className='ml-6 whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                          <span>登出</span>
                        </button>
                      )
                      :
                      (
                        <div>
                          <Link
                            to='/signup'
                            className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                          >
                            注冊
                          </Link>
                          <p className='mt-6 text-center text-xs font-medium text-gray-500'>
                            現有用戶?{' '}
                            <Link to='/login' className='text-indigo-600 hover:text-indigo-500'>
                              登入
                        </Link>
                          </p>
                        </div>
                      )
                  }
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Header;