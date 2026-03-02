import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Categories } from "../json/categories";
import { AnimatePresence } from "framer-motion";
import FetchSearch from "../hooks/fetchSearch";
import { useStateContext } from "../contexts/ContextProvider";
import SearchDataDisplay from "./SearchDataDisplay";

const SearchInput = () => {
    const { FullScreen, darkMode } = useStateContext()
    const [searchQuery, setSearchQuery] = useState('');
    const [modal, setModal] = useState(false)

    const { data: searchResults, refetch } = FetchSearch(searchQuery);

    const handleOnSearch = (item)=> {
        const trimmedQuery = item.trim();
        if (trimmedQuery && FullScreen) {
            setSearchQuery(trimmedQuery);
        }
    }

    const handleOnSelect = (item) => {
        setSearchQuery(item.name);
        refetch();
    };

    const handleSearchClick = () => {
        if (searchQuery.trim()) {
            refetch();
        } else {
            setModal(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const formatResult = (item) => {
        return (
            <div className="text-black">
                {item.name}
            </div>
        );
    };

    useEffect(() => {
        if (searchResults && searchResults.data && searchResults.data.length > 0) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }, [searchResults])

    const removeModal = () => {
        setModal(false)
    }

    return (
        <>
            <div className="relative z-50">
                <ReactSearchAutocomplete
                    styling={{ fontFamily: "jost" , iconColor: "#000", searchIconMargin: '0 0 0 0', border: "none", borderRadius: "30px", width: "100%", backgroundColor: darkMode ? "#212121" : "white", color: darkMode ? "white" : "black" }}
                    items={Categories}
                    className={`duration-300 search-input jost w-full md:border-none focus:shadow-none h-10`}
                    placeholder="Search"
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onKeyDown={handleKeyDown}
                    inputDebounce={600}
                    formatResult={formatResult}
                />
            </div>
            <AnimatePresence>
                {modal &&
                    <SearchDataDisplay modal={modal} searchResults={searchResults} removeModal={removeModal} />
                }
            </AnimatePresence>
        </>
    )
}

export default SearchInput