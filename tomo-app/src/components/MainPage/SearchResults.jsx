import BookCard from '../UI/BookCard.jsx';
import NoCover from '../../assets/No-Cover.jpg';

export default function SearchResults({results, term}) {

    return (
        <section className="flex flex-col text-left w-full gap-10 mt-8">
            <h3 className='text-2xl color-text'>Search results for: "{term}"</h3>
            <div className='text-center grid grid-cols-7 mx-auto gap-12'>
                {results.length !== 0 && results.map((item) => (
                    <BookCard
                        key={item.key}
                        book={item}
                        type='big'
                    />
                ))}
            </div>
        </section>
    )
}