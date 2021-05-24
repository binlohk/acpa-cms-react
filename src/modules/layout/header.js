import { Fragment } from 'react'
import Logo from '../../assets/images/KLLogo-removebg.png'
import { Popover, Transition } from '@headlessui/react'
import {
    MenuIcon,
  } from '@heroicons/react/outline'
  
  
  export default function Header() {
    return (
      <Popover className="relative bg-yellow-300 bg-opacity-70">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-transparent py-1 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src={Logo}
                    //   style={{height: '50px'}}
                      alt=""
                    />
                  </a>
                </div>

                {/* mobile toggle */}
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-yellow-300 bg-opacity-70 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>

                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-900 ml-6">
                    所有課程
                  </a>
                  <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-900 ml-6">
                    我的課程
                  </a>
                  <a href="#" className="whitespace-nowrap text-xs font-medium text-gray-500 hover:text-gray-900 ml-6">
                    注冊
                  </a>
                  <a
                    href="#"
                    className="ml-6 whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    登入
                  </a>
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
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="py-3 px-5 space-y-6">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <a href="#" className="text-xs font-medium text-gray-900 hover:text-gray-700">
                        Pricing
                      </a>
  
                      <a href="#" className="text-xs font-medium text-gray-900 hover:text-gray-700">
                        Docs
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-xs font-medium text-gray-500">
                        Existing customer?{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                          Sign in
                        </a>
                      </p>
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