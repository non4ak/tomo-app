import Header from '../components/Header.jsx';
import Highlights from '../components/Highlights.jsx';
import HeroSection from '../components/HeroSection.jsx';
import Browse from '../components/Browse.jsx';
import SearchInput from '../components/SearchInput.jsx';
import SearchResults from '../components/SearchResults.jsx';
import { useSearch } from '../hooks/useSearch.js';
import MainLayout from '../components/MainLayout.jsx';

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
            <MainLayout>
                {searchTerm && searchResult.length !== 0 ? (
                    <SearchResults results={searchResult} term={searchTerm} />
                ) : (
                    <HeroSection />
                )}
                <Highlights text='Recently viewed' />
                <Browse text='Browse by subject' />
            </MainLayout>
        </>
    )
}