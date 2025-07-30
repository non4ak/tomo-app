import { Star } from 'lucide-react';

export default function RatingStars({ rating }) {
    const round = Math.floor(rating);
    const empty = 5 - round; 

    return (
        <div className='flex'>
            {Array.from({ length: round }).map((_, index) => <Star key={`fill-${index}`} fill="#f29892" stroke="#f29892" strokeWidth={2} />)}
            {Array.from({ length: empty }).map((_, index) => <Star key={`empty-${index}`} stroke="#f29892" strokeWidth={2} />)}
        </div>
    )
}