import PitchCard from './PitchCard'

export default function PitchCardsList( { pitches } ) {

    return (
        <div>
            {pitches.map((pitch) => {
                return (
                  <PitchCard key={pitch.id} pitch={pitch} />
                )
              })}
        </div>
    )
}