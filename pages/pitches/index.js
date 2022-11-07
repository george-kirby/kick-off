import React, { useState, useEffect } from "react"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Layout from '../../components/layout';
import LootCardsList from '../../components/LootCardsList';
import LootsFilterBar from '../../components/LootsFilterBar';

import loots from '../../data/lootsData'

export async function getStaticProps() {
    return {
      props: {
        allLootsData: loots
      },
    };
  }

export default function LootsIndex( { allLootsData }) {
    const [activeFilters, setActiveFilters] = useState({
        minValue: 0,
        maxValue: 10000,
        minDistance: 0,
        maxDistance: 1000,
        unwantedDangers: []
    });
    const [filteredLoots, setFilteredLoots] = useState(allLootsData);
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
        const newFilteredLoots = allLootsData.filter(loot => {
            const valueOk = (loot.value >= activeFilters.minValue) && (loot.value <= activeFilters.maxValue)
            const distanceOk = (loot.distance >= activeFilters.minDistance) && (loot.distance <= activeFilters.maxDistance)
            const dangersOk = !loot.dangers.some(danger => activeFilters.unwantedDangers.includes(danger))
            return (valueOk && distanceOk && dangersOk)
        })
        setFilteredLoots(newFilteredLoots)
        }, [activeFilters]);

    const handleSortChange = (event) => {
        setActiveSort(event.target.value)
    }

    return (
        <Layout>
            <main>
            <LootsFilterBar { ...{ allLootsData, activeFilters, setActiveFilters } }/>
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
            <LootCardsList loots={filteredLoots.sort(sorting[activeSort].sortFunction)} />

            </main>
        </Layout>
    )
}