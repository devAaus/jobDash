import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {

    const links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Contact',
            path: '#'
        }
    ]
    const socials = [
        {
            name: 'Facebook',
            icon: <FaFacebook />
        },
        {
            name: 'Twitter',
            icon: <FaTwitter />
        },
        {
            name: 'Instagram',
            icon: <FaInstagram />
        },
        {
            name: "Github",
            icon: <FaGithub />
        }
    ]
    return (
        <section>
            <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-6 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    {links.map((li) =>
                        <div className="px-5 py-2" key={li.name}>
                            <Link href={li.path} className="text-base leading-6 text-gray-500 hover:text-gray-900">
                                {li.name}
                            </Link>
                        </div>
                    )}
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                    {socials.map((social) =>
                        <Link key={social.name} href="#" className="text-gray-400 hover:text-primary">
                            {social.icon}
                        </Link>
                    )}
                </div>
                <p className="mt-8 text-base leading-6 text-center text-gray-400">
                    © 2024 jobDash, Inc. All rights reserved.
                </p>
            </div>
        </section>
    )
}

export default Footer