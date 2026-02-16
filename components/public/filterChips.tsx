"use client";

import { Button } from "@/components/ui/button";

interface FilterChipsProps {
    options: string[];
    selected: string[];
    onToggle: (option: string) => void;
}

export default function FilterChips({ options, selected, onToggle }: FilterChipsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <Button
                    key={opt}
                    size="sm"
                    variant={selected.includes(opt) ? "default" : "outline"}
                    onClick={() => onToggle(opt)}
                >
                    {opt}
                </Button>
            ))}
        </div>
    );
}
