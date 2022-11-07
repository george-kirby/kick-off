import PitchCard from './PitchCard'
import styles from './PitchCardsList.module.css'

export default function PitchCardsList( { pitches } ) {

    return (
        <div className={styles.pitchCardsList}>
            {pitches.map((pitch) => {
                return (
                  <PitchCard key={pitch.id} pitch={pitch} />
                )
              })}
        </div>
    )
}