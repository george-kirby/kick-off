import React, { useState, useEffect } from "react"
import { Checkbox, FormControl, FormControlLabel, Input, Button } from '@mui/material';


export default function PitchesFilterBar( { pitchesData, activeFilters, setActiveFilters } ) {
    
    const [minPriceField, setMinPriceField] = useState(0)
    const [maxPriceField, setMaxPriceField] = useState(activeFilters.maxPrice)
    const [minDistanceField, setMinDistanceField] = useState(0)
    const [maxDistanceField, setMaxDistanceField] = useState(activeFilters.maxDistance)


    const [allFacilities, setAllFacilities] = useState(() => {
        const allFacilitiesInitial = []
        pitchesData.forEach(pitch => {
            pitch.facilities.forEach(facility => {
                if (!allFacilitiesInitial.includes(facility)) { allFacilitiesInitial.push(facility) }
            })
        })
        return allFacilitiesInitial
    });

    const handleMinPriceChange = (event) => {
        setMinPriceField(parseInt(event.target.value) || 0)
    }

    const handleMaxPriceChange = (event) => {
        setMaxPriceField(parseInt(event.target.value) || 10000)
    }

    const applyPriceFilter = () => {
        setActiveFilters({...activeFilters, minPrice: minPriceField, maxPrice: maxPriceField})
    }

    const handleMinDistanceChange = (event) => {
        setMinDistanceField(parseInt(event.target.value) || 0)
    }

    const handleMaxDistanceChange = (event) => {
        setMaxDistanceField(parseInt(event.target.value) || 1000)
    }

    const applyDistanceFilter = () => {
        setActiveFilters({...activeFilters, minDistance: minDistanceField, maxDistance: maxDistanceField})
    }

    const toggleFacility = (facility, value) => {
        const newWantedFacilities = [...activeFilters.wantedFacilities]
        if (value) {
            newWantedFacilities.push(facility)
        } else {
            const index = newWantedFacilities.indexOf(facility);
                if (index > -1) { 
                    newWantedFacilities.splice(index, 1);
                }
            }
        setActiveFilters({...activeFilters, wantedFacilities: newWantedFacilities})
    }

    return (
        <div>
            <div className="value-input">
                <p>What's your price range? (£ per hour)</p>
                <div className="value-inputs-container">
                    <Input type="number" value={minPriceField} min="0" max="10000" label="Min value (pounds sterling per hour)" onChange={handleMinPriceChange} />
                    <Input type="number" value={maxPriceField} min="0" max="10000" label="Max value (pounds sterling per hour)" onChange={handleMaxPriceChange} />
                    <Button variant="contained" type="submit" onClick={applyPriceFilter}>Apply</Button>
                </div>
            </div>
            <div className="distance-input">
                <p>And distance? (miles from home)</p>
                <div className="distance-inputs-container">
                    <Input type="number" value={minDistanceField} min="0" max="1000" label="Min distance (miles)" onChange={handleMinDistanceChange} />
                    <Input type="number" value={maxDistanceField} min="0" max="1000" label="Max distance (miles)" onChange={handleMaxDistanceChange} />
                    <Button variant="contained" type="submit" onClick={applyDistanceFilter}>Apply</Button>
                </div>
            </div>
            <div className="distance-input"></div>
            <div className="facilities-inputs">
                <p>Select any facilities you need:</p>
                {allFacilities.map((facility, index) => {
                    return (
                        <FormControlLabel key={index} control={<Checkbox />} label={facility} onChange={(event, value) => toggleFacility(facility, value)} />                
                    )
                })}
            </div>
        </div>
    )
}