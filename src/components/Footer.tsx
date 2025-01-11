import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-6 px-20 border-t-2 border-black py-3">
            <div className="flex flex-col py-5 md:flex-row justify-center items-center sm:justify-around">
                <div className="flex flex-col ">
                    <div className="flex justify-center">
                    <Image src="/logo.png" alt="Logo" width={100} height={100} />
                    </div>
                    <h1 className="heading-black">Download Our Mobile App</h1>
                    <div className="flex flex-col justify-evenly sm:flex-row gap-8 mt-4">
                        <Image src="/play-store.png" alt="" width={100} height={100} />
                        <Image src="/app-store.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div className="flex flex-col items-center gap-3 text-lg md:text-3xl">
                        <h1 className="heading-black">Follow Us On</h1>
                        <div className="flex justify-evenly gap-8">
                            <a href="https://www.facebook.com/" target="_blank"><FaFacebook className="text-[#005ad0] text-3xl" /></a>
                            <a href="https://www.youtube.com/" target="_blank"><FaYoutube className="text-[#ff0000] text-3xl" /></a>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="heading-black">Quick Links</h1>
                    <div className="flex flex-col items-center gap-2 mt-2">
                        <Link href="/" className="text-black">Home</Link>
                        <Link href="/cart" className="text-black">Cart</Link>
                        <Link href="/profile" className="text-black">Profile</Link>
                        <Link href="/products" className="text-black">Products</Link>
                    </div>
                </div>
            </div>

            <div className="flex mt-10 justify-evenly">
                <p className="text-black">Copyright © {currentYear} | Organic Store</p>
            </div>
        </footer>
    )
}
