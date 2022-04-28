import { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../services/authService'
import Logo from '../../assets/images/KL-logo.png'
import { useEffect } from 'react'
import LogoName from '../../assets/images/KL-logo-name.png'
import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import useSidebar from '../../hooks/useSidebar'

const customStyles = (offset) => {
    return {
        backgroundColor: `${offset === 0 ? 'transparent' : 'rgba(81,54,84,1)'}`,
        color: '#A5924B',
    }
}

const Header = () => {
    const { getUser } = useContext(UserContext)
    const { open } = useSidebar()

    const [offset, setOffset] = useState(0)
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
    }, [])

    return (
        <Popover className="fixed z-50 w-full" style={customStyles(offset)}>
            {({ open }) => (
                <>
                    <div className="max-w-full py-4 mx-2 sm:px-6">
                        <div className="flex items-center justify-between py-1 border-b-2 border-transparent md:justify-start md:space-x-10">
                            <div className="flex items-center justify-start lg:w-0 lg:flex-1">
                                <Link to="/" className="flex items-center">
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className="w-auto h-8 sm:h-10"
                                        src={Logo}
                                        alt="嘉林財俊"
                                    />
                                    <img
                                        className="w-auto h-8"
                                        src={LogoName}
                                        alt="嘉林財俊"
                                    />
                                </Link>
                                <Link
                                    to="/"
                                    className="ml-6 font-bold text-md hover:text-yellow-500 invisible md:visible"
                                >
                                    所有課程
                                </Link>
                                {getUser().id != null && (
                                    <Link
                                        to="/my-courses"
                                        className="ml-6 font-bold text-md hover:text-yellow-500 invisible md:visible lg:visible;"
                                    >
                                        我的課程
                                    </Link>
                                )}
                            </div>
                            {/* mobile toggle */}
                            <div className="-my-2 md:hidden">
                                <Popover.Button
                                    style={{ backgroundColor: 'transparent' }}
                                    className="inline-flex items-center justify-center p-2 rounded-md bg-opacity-70 hover:text-yellow-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                            {/* mobile toggle */}
                            <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                                {getUser().id != null ? (
                                    <>
                                        <Link
                                            to={`/user/${getUser().id}`}
                                            className="ml-6 hover:text-yellow-500"
                                        >
                                            <AccountCircleIcon className="text-xl" />
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="ml-6 font-bold text-md hover:text-yellow-500"
                                        >
                                            <span>登出</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to={{
                                                pathname:
                                                    'https://acpa.training/',
                                            }}
                                            target="_blank"
                                            className="ml-6 font-bold whitespace-nowrap text-md hover:text-yellow-500"
                                        >
                                            回到主頁
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="ml-6 font-bold whitespace-nowrap text-md hover:text-yellow-500"
                                        >
                                            注冊
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="ml-6 font-bold text-md hover:text-yellow-500"
                                        >
                                            登入
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            static
                         className="absolute inset-x-0 top-13 rounded-lg w-45 h-60 transition origin-top-right transform md:hidden bg-white right-1"
                         >
                            <div 
                            className=" p-2 shadow-lg ring-1"
                            >
                                <div 
                                 className="px-5 py-3 space-y-6"
                                >
                                    <div 
                                     className="flex flex-col gap-y-6  text-center"
                                    >
                                        <Link
                                            to={`/user/${getUser().id}`}
                                            className="hover:text-yellow"
                                        >
                                            <AccountCircleIcon className="text-xl text-center" 
                                            />
                                        </Link>
                                        <Link
                                            to="/"
                                            className="font-medium text-center text-gray-900 text-md hover:text-gray-700"
                                        >
                                            所有課程
                                        </Link>
                                        <Link
                                            to="/my-courses"
                                            className="font-medium text-center text-gray-900 text-md hover:text-gray-700"
                                        >
                                            我的課程
                                        </Link>
                                    </div><div className='ml-24'>
                                    {getUser().id ? (
                                        <button
                                            onClick={handleLogout}
                                            className=" px-10 py-4 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap text-md hover:bg-indigo-700"
                                        >
                                            <span>登出</span>
                                        </button>
                                    ) : (
                                        <div>
                                            <Link
                                                to={{
                                                    pathname:
                                                        'https://acpa.training/',
                                                }}
                                                target="_blank"
                                                className="flex items-center justify-center w-full px-4 my-2 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm text-md hover:bg-indigo-700"
                                            >
                                                回到主頁
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm text-md hover:bg-indigo-700"
                                            >
                                                注冊
                                            </Link>
                                            <p className="mt-6 font-medium text-center text-gray-500 text-md">
                                                現有用戶?{' '}
                                                <Link
                                                    to="/login"
                                                    className="text-indigo-600 hover:text-indigo-500"
                                                >
                                                    登入
                                                </Link>
                                            </p>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
export default Header
