import { Library } from "lucide-react";
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";

export default function Header({children}) {
    return (
        <header className="w-screen flex flex-col gap-4">
            <div className="bg-light-blue w-full text-center">
                <blockquote className="text-md md:text-lg lg:text-xl py-2 font-sans text-white">We are all in the gutter, but some of us are looking at the stars</blockquote>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:max-w-[1280px] justify-between mx-auto px-4 items-center gap-4 sm:gap-0 py-2">
                {children}
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Book with tomo name"
                        className="max-h-12"
                    />
                </Link>
                <button className="button-library">
                    <Library color="#f29892" className="w-5 h-5" />
                    <span className="font-medium text-lg">My library</span>
                </button>
            </div>
        </header>
    )
}