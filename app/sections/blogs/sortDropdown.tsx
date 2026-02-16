"use client";

import { useState } from "react";
import { FaSort } from "react-icons/fa";

interface SortDropdownProps {
    selected: string;
    onSelect: (val: string) => void;
    className?: string;
}

const sortOptions = ["Newest", "Oldest", "Most Liked", "Featured"];

export default function SortDropdown({ selected, onSelect }: SortDropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 transition"
            >
                <FaSort />
                Sort: {selected}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    {sortOptions.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                onSelect(option);
                                setOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
