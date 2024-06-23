"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import Link from "next/link"
import { GoHome } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { FaRegUser } from "react-icons/fa"
import Image from "next/image"


const Navbar = () => {
    const router = useRouter()

    const { auth, setAuth } = useAuth()

    const isAuthenticated = !!auth?.accessToken
    const role = auth?.role

    const handleLogout = async () => {
        try {

            if (!auth || !auth.accessToken) {
                throw new Error('Refresh token not found');
            }
            const accessToken = auth.accessToken;

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/logout`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            );

            localStorage.removeItem('auth');
            setAuth({ accessToken: '', refreshToken: '', role: '' });
            router.push('/login')

        } catch (error) {

        }
    }

    return (
        <nav className='py-4 px-3'>

            <div className='flex items-center justify-between '>

                <Link href="/">
                    {/* <h2 className='text-xl font-extrabold'>
                        jobDash
                    </h2> */}
                    <Image src={"/logo.png"} alt="logo" width={30} height={40} />
                </Link>

                <div>
                    {isAuthenticated ? (
                        // <DropdownMenu>
                        //     <DropdownMenuTrigger>
                        //         <Avatar className="w-8 h-8">
                        //             <AvatarFallback>
                        //                 <FaRegUser className="w-5 h-5" />
                        //             </AvatarFallback>
                        //         </Avatar>
                        //     </DropdownMenuTrigger>

                        //     <DropdownMenuContent>

                        //         <DropdownMenuItem asChild>
                        //             {role === 'ADMIN' ? (
                        //                 <Link
                        //                     href={'/admin-dashboard'}
                        //                     className="flex gap-1 items-center"
                        //                 >
                        //                     <GoHome />
                        //                     Dashboard
                        //                 </Link>
                        //             ) : (
                        //                 <Link
                        //                     href={`/dashboard/${auth?.role.toLowerCase()}/profile`}
                        //                     className="flex gap-1 items-center"
                        //                 >
                        //                     <GoHome />
                        //                     Dashboard
                        //                 </Link>
                        //             )}
                        //         </DropdownMenuItem>

                        //         <DropdownMenuItem
                        //             className="flex gap-1 items-center focus:bg-destructive focus:text-white"
                        //             onClick={handleLogout}
                        //         >
                        //             <TbLogout2 />
                        //             LogOut
                        //         </DropdownMenuItem>

                        //     </DropdownMenuContent>
                        // </DropdownMenu>

                        <div className="flex gap-2">

                            {role === "ADMIN"
                                ? <Button variant="outline" size={"sm"} asChild className="hover:bg-gray-300">
                                    <Link href='/admin-dashboard'>
                                        Dashboard
                                    </Link>
                                </Button>
                                : <Button variant="outline" size={"sm"} asChild className="hover:bg-gray-300">
                                    <Link href={`/dashboard/${auth?.role.toLowerCase()}/profile`}>
                                        Dashboard
                                    </Link>
                                </Button>
                            }



                            {role === "RECRUITER" &&
                                <Button size={"sm"} asChild>
                                    <Link href='/dashboard/recruiter/jobs/add-jobs'>
                                        Add Job
                                    </Link>
                                </Button>
                            }

                            <Button variant="destructive" size={"sm"} onClick={handleLogout} className="flex gap-1 items-center">
                                Logout
                                <TbLogout2 className="w-5 h-5 rotate-180" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button variant="outline" size={"sm"} asChild className="hover:bg-transparent hover:text-primary">
                                <Link href={'/login'}>
                                    Login
                                </Link>
                            </Button>

                            <Button variant="default" size={"sm"} asChild>
                                <Link href={'/register'}>
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar