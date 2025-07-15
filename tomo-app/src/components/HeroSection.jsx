import { memo } from 'react';
import BooksPath from '../assets/books-png.png';

export default memo(function HeroSection() {
    return (
        <section className="w-full h-56 md:h-46 bg-gradient flex rounded-lg px-12 justify-between">
            <div className="color-light-green text-lg sm:text-xl md:text-2xl font-sans flex flex-col justify-center gap-4">
                <div className="loading-loose tracking-wide">
                    <h2>Not sure what to read today?</h2>
                    <h2>Take our quick <span className="color-text font-semibold">quiz</span> and get personalized <span className="color-text font-semibold">book recommendations</span></h2>
                </div>
                <button className="bg-text text-xl px-4 py-2 rounded-full w-42 tracking-wide cursor-pointer">Let's start</button>
            </div>
            <div className="bg-white aspect-video w-70 my-4 overflow-hidden rounded-4xl select-none">
                <img 
                    src={BooksPath} 
                    alt="Two rows of books"
                    className='rounded-3xl w-full h-auto object-cover'
                    />
            </div>
        </section>
    )
})