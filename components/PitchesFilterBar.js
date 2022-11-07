import React, { useState, useEffect } from "react"
import { Checkbox, FormControl, FormControlLabel, Input, Button } from '@mui/material';
import styles from './PitchesFilterBar.module.css'

export default function PitchesFilterBar( { pitchesData, activeFilters, setActiveFilters } ) {
    
    const [minPriceField, setMinPriceField] = useState(0)
    const [maxPriceField, setMaxPriceField] = useState(activeFilters.maxPrice)
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
        // setMinPriceField(parseInt(event.target.value) || 0)
        setMinPriceField(event.target.value.replace(/[^0-9\.]+/gi, ""))
    }
    
    const handleMaxPriceChange = (event) => {
        setMaxPriceField(event.target.value.replace(/[^0-9\.]+/gi, ""))
    }

    const applyPriceFilter = () => {
        setActiveFilters({...activeFilters, minPrice: minPriceField, maxPrice: maxPriceField})
    }

    const handleMaxDistanceChange = (event) => {
        setMaxDistanceField(event.target.value.replace(/[^0-9\.]+/gi, ""))
    }

    const applyDistanceFilter = () => {
        setActiveFilters({...activeFilters, maxDistance: maxDistanceField})
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
            <div className={styles.filterContainer}>
                <p>What's your price range? (£ per hour)</p>
                <div className={styles.valueInputsContainer}>
                    <div className={styles.inputWrapper}>
                        <span>Min: £ </span>
                        <Input type="text" pattern="\d*" value={minPriceField} min="0" max="1000" label="Min value (pounds sterling per hour)" onChange={handleMinPriceChange} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span>Max: £ </span>
                        <Input type="text" pattern="\d*" value={maxPriceField} min="0" max="1000" label="Max value (pounds sterling per hour)" onChange={handleMaxPriceChange} />
                    </div>
                    <Button variant="contained" onClick={applyPriceFilter}>Apply</Button>
                </div>
            </div>
            <div className={styles.filterContainer}>
                <p>How far can you travel? (miles from home)</p>
                <div className={styles.valueInputsContainer}>
                    <div className={styles.inputWrapper}>
                        <span>Max distance: </span>
                        <Input type="text" pattern="\d*" value={maxDistanceField} min="0" max="100" label="Max distance (miles)" onChange={handleMaxDistanceChange} />
                        <span> miles</span>
                    </div>
                    <Button variant="contained" onClick={applyDistanceFilter}>Apply</Button>
                </div>
            </div>
            <div className={styles.filterContainer}>
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