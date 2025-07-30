import { Search as SearchIcon } from 'lucide-react';

export default function SearchInput({ onChange, value, placeholerText = 'Search...', results = [], onSelect }) {
    return (
        <div className="relative w-[300px]">
            <SearchIcon
                color='#64958c'
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholerText}
                className="w-full p-2 pl-12 text-lg border border-blue rounded-full focus:outline-none color-text"
            />
            {/* {value && results.length > 0 && (
                <ul className='bg-white w-full'>
                    {results.map((item) => (
                        <li
                            key={item.key}
                            onClick={() => onSelect(item.title)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    )
}