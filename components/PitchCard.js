import { Card } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function PitchCard( { pitch } ) {
    const image = pitch.image || { src: `/images/islands/EmeraldIsle.png`, alt: "Emerald Isle" }

    return (
        <Link href={`/pitches/${pitch.slug}`}>
            <Card variant="outlined">
                {/* disabled image to simplify view for filter/sort dev */}
                {/* <Image
                  priority
                  src={image.src}
                  height={20}
                  width={20}
                  alt={image.alt}
                /> */}
                <h3>{pitch.title}</h3>
                <ul>
                    <li>{pitch.distance} miles</li>
                    <li>{pitch.value} dubloons</li>
                </ul>
                <ul className="facilities-list">
                {pitch.facilities.map((facility, index) => {
                    return (
                      <li key={index}>{facility}</li>
                    )
                  })}
                </ul>
            </Card>
        </Link>
    )
}
