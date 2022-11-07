import { Card, CardActionArea } from '@mui/material';
import Image from 'next/image';
import styles from './PitchCard.module.css'
import PitchFacilities from './PitchFacilities';

export default function PitchCard( { pitch } ) {
    const image = pitch.image || { src: `/images/Football.svg`, alt: "football soccer ball" }

    return (
            <Card className={styles.pitchCard} variant="outlined">
              <CardActionArea className={styles.cardActionArea} href={`/pitches/${pitch.slug}`}>
                <Image
                  className={styles.pitchImage}
                  priority
                  src={image.src}
                  height={200}
                  width={200}
                  alt={image.alt}
                />
                <div className={styles.textContainer}>
                  <h3>{pitch.title}</h3>
                  <ul>
                      <li>{pitch.distance} miles away</li>
                      <li>£{pitch.price} per hour</li>
                  </ul>
                  <PitchFacilities facilities={pitch.facilities} />
                </div>
              </CardActionArea>
            </Card>
    )
}
