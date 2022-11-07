import { Card, CardActionArea } from '@mui/material';
import Image from 'next/image';
import styles from './PitchCard.module.css'

export default function PitchCard( { pitch } ) {
    const image = pitch.image || { src: `/images/islands/EmeraldIsle.png`, alt: "Emerald Isle" }

    return (
            <Card className={styles.pitchCard} variant="outlined">
              <CardActionArea className={styles.cardActionArea} href={`/pitches/${pitch.slug}`}>
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
                {pitch.facilities.length > 0 ? 
                  (
                    <ul className="facilities-list">
                      {pitch.facilities.map((facility, index) => {
                        return (
                          <li key={index}>{facility}</li>
                        )
                      })}
                    </ul>
                  )
                  :
                  (
                    <ul><li>No extra facilities at this pitch.</li></ul>
                  )}
              </CardActionArea>
            </Card>
    )
}
