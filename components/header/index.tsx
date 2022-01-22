/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faFlask } from '@fortawesome/free-solid-svg-icons'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'


let navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Calendar', href: `https://calendar.google.com/calendar/u/0/embed?src=bthomas21@gmail.com&ctz=America/New_York&pli=1`, current: false },
  { name: 'Classes', href: '/class', current: false },
  { name: 'Contact Me', href: 'mailto:brandy.kilpatrick@stjohns.k12.fl.us', current: false },
  { name: 'Extra Practice', href: 'https://www.sciencegeek.net/Chemistry/taters/directory.shtml', current: false },
  { name: 'Forgot Password', href: '#', current: false },
  { name: "", href: '#', current: false }
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const Header = () => {
  const { data: session } = useSession()

  const LoggedInStuff = () => {
    if (session) {
      navigation[6] = { name: 'Sign Out', href: '/api/auth/signout/google', current: false }
      return <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <div className="hidden md:block">
              <button onClick={() => signOut()} className="text-gray-300 hover:shadow hover:bg-indigo-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Out</button>
            </div>
          </button>

        </div>
      </div>
    } else {
      navigation[6] = { name: 'Sign In', href: '/api/auth/signin/google', current: false }
      return (
        <div className="hidden md:block">
          <button onClick={() => signIn()} className="text-gray-300 hover:shadow hover:bg-indigo-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</button>
        </div>
      )
    }
  }
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-indigo-700">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link href="/">
                    <FontAwesomeIcon className="h-10 w-10 hover:cursor-pointer" icon={faAtom} />
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.filter(x => x.name != "Sign In").filter(x => x.name != 'Sign Out').map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-indigo-800 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium hover:shadow'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                      {session && session.user && session.user.email}
                    </div>
                  </div>
                </div>

                {LoggedInStuff()}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-indigo-800 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
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
    </div>
  )
}

export default Header;