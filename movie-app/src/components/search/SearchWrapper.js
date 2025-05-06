import { useSearchParams } from "react-router-dom"
import Search from "./Search";

const SearchWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("search") || "";

    const handleSearch = (query) => {
        setSearchParams({ search: query });
    };

    return (
        <Search initialQuery={initialQuery} onSearch={handleSearch} />
    );
}

export default SearchWrapper;