"use client";

interface BooleanOption {
    key: string;
    label: string;
}

interface BooleanFilterProps {
    options: BooleanOption[];
    selected: string[];
    onToggle: (key: string) => void;
}

export default function BooleanFilter({ options, selected, onToggle }: BooleanFilterProps) {
    return (
        <div className="flex gap-4">
            {options.map((opt) => (
                <button
                    key={opt.key}
                    onClick={() => onToggle(opt.key)}
                    className={`px-4 py-2 rounded-lg border shadow ${selected.includes(opt.key) ? "bg-primary text-white" : "bg-white"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
