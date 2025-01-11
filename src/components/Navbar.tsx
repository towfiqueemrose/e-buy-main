"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    return (
        <div className="flex px-10 bg-[#ffffff] border-green-200 items-center justify-between">
            <Link href="/" className="my-3">
                <Image src="/logo.png" alt="Vercel Logo" width={60} height={60} />
                <h1 className="text-xl text-primary font-bold font-serif">E-BUY</h1>
            </Link>

            <div>
                {/* Search bar */}
            </div>

            <div className="flex gap-10 items-center">
                <div className="flex gap-4">
                    {[
                        { href: "/products", label: "PRODUCTS" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${pathname === link.href ? "text-primary font-semibold" : "text-black"}  text-base md:text-lg`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex gap-12 my-3">
                    <Link href="/cart" className="relative mt-2">
                        <Image src="/shopping-cart.svg" alt="Cart" width={25} height={25} priority />

                    </Link>

                    {session?.user ? (
                        <Link href="/profile">
                            <Image
                                src={session.user.image || "/user.svg"}
                                alt={session.user.name || "user"}
                                width={32}
                                height={32}
                                className="rounded-full"
                                priority
                            />
                        </Link>
                    ) : (
                        <Link href="/auth/signin" className="bg-primary rounded-full px-5 py-2 text-white font-semibold text-lg">Signin</Link>
                    )}
                </div>
            </div>
        </div>
    )
}