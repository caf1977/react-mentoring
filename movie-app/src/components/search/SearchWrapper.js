import { Outlet, useSearchParams } from "react-router-dom"
import Search from "./Search";

const SearchWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("search") || "";

    const handleSearch = (query) => {
        setSearchParams({ search: query });
    };

    return (
        <>
            <Search initialQuery={initialQuery} onSearch={handleSearch} />
            <Outlet />
        </>
    );
}

export default SearchWrapper;