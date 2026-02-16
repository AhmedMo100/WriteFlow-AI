"use client";

export interface SearchInputProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-gray-300 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
        />
    );
}
