import React, { useState, useEffect } from "react"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Layout from '../../components/layout';
import PitchCardsList from '../../components/PitchCardsList';
import PitchesFilterBar from '../../components/PitchesFilterBar';

import pitchesData from '../../data/pitchesData'

export async function getStaticProps() {
    return {
      props: { pitchesData },
    };
  }

export default function PitchesIndex( { pitchesData }) {
    const [activeFilters, setActiveFilters] = useState({
        minValue: 0,
        maxValue: 10000,
        minDistance: 0,
        maxDistance: 1000,
        unwantedFacilities: []
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
        distanceHigh: {
            displayText: "Furthest first",
            sortFunction: (a, b) => {
                return b.distance - a.distance
            }
        },
        valueHigh: {
            displayText: "Value high-to-low",
            sortFunction: (a, b) => {
                return b.value - a.value
            },
        },
        valueLow: {
            displayText: "Value low-to-high",
            sortFunction: (a, b) => {
                return a.value - b.value
            },
        }
    }

    useEffect(() => {
        const newFilteredPitches = pitchesData.filter(pitch => {
            const valueOk = (pitch.value >= activeFilters.minValue) && (pitch.value <= activeFilters.maxValue)
            const distanceOk = (pitch.distance >= activeFilters.minDistance) && (pitch.distance <= activeFilters.maxDistance)
            const facilitiesOk = !pitch.facilities.some(facility => activeFilters.unwantedFacilities.includes(facility))
            return (valueOk && distanceOk && facilitiesOk)
        })
        setFilteredPitches(newFilteredPitches)
        }, [activeFilters]);

    const handleSortChange = (event) => {
        setActiveSort(event.target.value)
    }

    return (
        <Layout>
            <main>
            <PitchesFilterBar { ...{ pitchesData, activeFilters, setActiveFilters } }/>
            <FormControl size="small">
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
            <PitchCardsList pitches={filteredPitches.sort(sorting[activeSort].sortFunction)} />

            </main>
        </Layout>
    )
}