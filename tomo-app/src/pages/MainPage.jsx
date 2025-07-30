import Header from '../components/UI/Header.jsx';
import Highlights from '../components/MainPage/Highlights.jsx';
import HeroSection from '../components/MainPage/HeroSection.jsx';
import Browse from '../components/MainPage/Browse.jsx';
import SearchInput from '../components/UI/SearchInput.jsx';
import SearchResults from '../components/MainPage/SearchResults.jsx';
import { useSearch } from '../hooks/useSearch.js';

export default function MainPage() {
    const { searchTerm, setSearchTerm, searchResult, loading, error } = useSearch();

    return (
        <>
            <Header>
                <SearchInput
                    onChange={e => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholerText="Search book..."
                    results={searchResult}
                    onSelect={(item) => setSearchTerm(item)}
                />
            </Header>
            <main>
                {searchTerm && searchResult.length !== 0 ? (
                    <SearchResults results={searchResult} term={searchTerm} />
                ) : (
                    <HeroSection />
                )}
                <Highlights text='Recently viewed' />
                <Browse text='Browse by subject' />
            </main>
        </>
    )
}