"use client";

import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="flex items-center w-full md:w-1/2 bg-white dark:bg-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition">
            <FaSearch className="text-gray-400 mr-3" />
            <input
                type="text"
                placeholder="Search posts..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-textPrimary placeholder:text-gray-400"
            />
        </div>
    );
};

export default SearchBar;
