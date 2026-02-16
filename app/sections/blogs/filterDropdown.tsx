"use client";

import { useState } from "react";

interface FilterDropdownProps {
    tags: string[];
    selectedTags: string[];
    onChange: (selected: string[]) => void;
}

export default function FilterDropdown({ tags, selectedTags, onChange }: FilterDropdownProps) {
    const [open, setOpen] = useState(false);

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onChange(selectedTags.filter((t) => t !== tag));
        } else {
            onChange([...selectedTags, tag]);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 transition"
            >
                Filters
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 space-y-2">
                    {tags.map((tag) => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />
                            <span>{tag}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
