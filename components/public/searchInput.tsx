"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
    const [input, setInput] = useState(value);

    // Debounce to reduce API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(input);
        }, 500);

        return () => clearTimeout(timer);
    }, [input, onChange]);

    return (
        <Input
            type="text"
            placeholder={placeholder || "Search..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full max-w-md"
        />
    );
}
