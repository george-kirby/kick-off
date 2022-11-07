export default function PitchFacilities({ facilities }) {

    return (
        <div>
            <p>Facilities:</p>                
            {facilities.length > 0 ? 
            (
                <ul className="facilities-list">
                {facilities.map((facility, index) => {
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
        </div>
    )
}
