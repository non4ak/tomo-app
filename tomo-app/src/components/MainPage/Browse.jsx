import TabButton from "./TabButton";
import { useState } from "react";

export default function Browse({ text }) {
    const [isSelected, setSelected] = useState(null);

    const handleSelect = (selected) => {
        setSelected(selected);
    }

    return (
        <section className="flex flex-col w-full px-12 gap-4">
            <h3 className="text-2xl color-text font-sans tracking-wide">{text}</h3>
            <menu className="flex gap-12">  
                <TabButton isSelected={isSelected === 'popular-author'} onSelect={() => handleSelect('popular-author')}>Popular author</TabButton>                
                <TabButton isSelected={isSelected === 'newest'} onSelect={() => handleSelect('newest')}>The newest</TabButton>
                <TabButton isSelected={isSelected === 'love-super'} onSelect={() => handleSelect('love-super')}>Love super</TabButton>
                <TabButton isSelected={isSelected === 'cocogamba'} onSelect={() => handleSelect('cocogamba')}>Cocogamba</TabButton>
            </menu>
        </section>
    )
}