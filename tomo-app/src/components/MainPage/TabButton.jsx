export default function TabButton({ children, isSelected, onSelect }) {
    return (
        <li>
            <button onClick={onSelect} className={`color-text cursor-pointer text-xl ${isSelected ? 'custom-decoration' : null}`}>{children}</button>
        </li>
    )

}