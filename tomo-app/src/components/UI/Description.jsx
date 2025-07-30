import { useState } from "react"

export default function Description({ text, maxLength = 350 }) {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > maxLength;
    const displayedText = !expanded && isLong ? text.slice(0, maxLength) + '...' : text;

    return (
        <div>
            <p>{displayedText}</p>
            {isLong && (
                <button className="font-serif font-medium select-none hover:underline" onClick={() => setExpanded(prev => !prev)}>
                    {expanded ? 'показати менше' : 'показати більше'}
                </button>
            )}
        </div>
    )
}