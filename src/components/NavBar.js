import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useFetchInfoQuery } from '../store/apis/usersInfoApi';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Profile', href: '/profile', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar({ currentPage, user }) {
  for (const nav of navigation) {
    if (nav.name === currentPage) nav.current = true;
    else nav.current = false;
  }

  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate('/login');
  };

  const { data, error, isLoading } = useFetchInfoQuery({ id: user.id });

  let content;

  if (isLoading) {
    content = 'Loading user information...';
  } else if (error) {
    content = 'Error loading user information';
  } else if (data) {
    const userInfo = data[0];
    if (user) {
      content = (
        <Disclosure as="nav" className="custom-background  fixed w-full top-0 z-50">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <p className="h-8 w-auto font-sans font-extrabold text-gray-50 text-xl">Mandalay Amateur Photo Association</p>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="hidden sm:ml-6 sm:block pr-4">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'hover:bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white',
                              'rounded-md px-3 py-2 text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-white ">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="object-cover h-10 w-10 rounded-full"
                            src={userInfo.profileUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition>
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/userProfile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                User Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={logout}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      );
    } else {
      content = 'User not found';
    }
  }

  return <div>{content}</div>;
}
