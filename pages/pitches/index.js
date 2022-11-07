import React, { useState, useEffect } from "react"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Layout from '../../components/layout';
import PitchCardsList from '../../components/PitchCardsList';
import PitchesFilterBar from '../../components/PitchesFilterBar';
import styles from './PitchesIndex.module.css'

import pitchesData from '../../data/pitchesData'

export async function getStaticProps() {
    return {
      props: { pitchesData },
    };
  }

export default function PitchesIndex( { pitchesData }) {
    const [activeFilters, setActiveFilters] = useState({
        minPrice: 0,
        maxPrice: 100,
        maxDistance: 10,
        wantedFacilities: []
    });
    const [filteredPitches, setFilteredPitches] = useState(pitchesData);
    const [activeSort, setActiveSort] = useState("distanceLow");

    const sorting = {
        distanceLow: {
            displayText: "Closest first",
            sortFunction: (a, b) => {
                return a.distance - b.distance
            },
        },
        // distanceHigh: {
        //     displayText: "Furthest first",
        //     sortFunction: (a, b) => {
        //         return b.distance - a.distance
        //     }
        // },
        priceLow: {
            displayText: "Price low-to-high",
            sortFunction: (a, b) => {
                return a.price - b.price
            },
        },
        priceHigh: {
            displayText: "Price high-to-low",
            sortFunction: (a, b) => {
                return b.price - a.price
            },
        },
    }

    useEffect(() => {
        const newFilteredPitches = pitchesData.filter(pitch => {
            const priceOk = (pitch.price >= activeFilters.minPrice) && (pitch.price <= activeFilters.maxPrice)
            const distanceOk = (pitch.distance <= activeFilters.maxDistance)
            // const facilitiesOk = !pitch.facilities.some(facility => activeFilters.wantedFacilities.includes(facility))
            const facilitiesOk = activeFilters.wantedFacilities.every(facility => pitch.facilities.includes(facility))
            return (priceOk && distanceOk && facilitiesOk)
        })
        setFilteredPitches(newFilteredPitches)
        }, [activeFilters]);

    const handleSortChange = (event) => {
        setActiveSort(event.target.value)
    }

    return (
        <Layout pitches>
            <main>
            <h1>Find a football pitch in London</h1>
            <PitchesFilterBar { ...{ pitchesData, activeFilters, setActiveFilters } }/>
            <FormControl className={styles.sortContainer} size="small">
                <InputLabel>Sort</InputLabel>
                <Select
                    value={activeSort}
                    label="Sort"
                    onChange={handleSortChange}
                >
                    {Object.keys(sorting).map((objectKey, index) => {
                        return (
                            <MenuItem key={index} value={objectKey}>
                                {sorting[objectKey].displayText}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {filteredPitches.length > 0 ? (
                <p>Showing <b>{filteredPitches.length}</b> {filteredPitches.length > 1 ? "pitches" : "pitch"}</p>
            ) : (
                <p>Unfortunately there are no pitches which match your search criteria.</p>
            )
        }
            <PitchCardsList pitches={filteredPitches.sort(sorting[activeSort].sortFunction)} />

            </main>
        </Layout>
    )
}