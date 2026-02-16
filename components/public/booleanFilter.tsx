"use client";

import { Button } from "../ui/button";

interface BooleanFilterOption {
    key: string;      // unique key, مثلا "featured"
    label: string;    // label يظهر على الزرار
}

interface BooleanFilterProps {
    options: BooleanFilterOption[];
    selected: string[];              // array of selected keys
    onToggle: (key: string) => void; // toggle callback
}

export default function BooleanFilter({ options, selected, onToggle }: BooleanFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const isSelected = selected.includes(option.key);
                return (
                    <Button
                        key={option.key}
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => onToggle(option.key)}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
}
