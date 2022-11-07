import { Card } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PitchCard.module.css'

export default function PitchCard( { pitch } ) {
    const image = pitch.image || { src: `/images/islands/EmeraldIsle.png`, alt: "Emerald Isle" }

    return (
        <Link href={`/pitches/${pitch.slug}`}>
            <Card className={styles.pitchCard} variant="outlined">
                {/* disabled image to simplify view for filter/sort dev */}
                <Image
                  className={styles.pitchImage}
                  priority
                  src={image.src}
                  height={200}
                  width={200}
                  alt={image.alt}
                />
                <h3>{pitch.title}</h3>
                <ul>
                    <li>{pitch.distance} miles away</li>
                    <li>£{pitch.price} per hour</li>
                </ul>
                <p>Facilities:</p>
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
