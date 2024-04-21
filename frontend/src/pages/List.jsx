import React, { useState } from 'react'
import './List.css'
// react-router-dom
import { useLocation } from 'react-router-dom'
// To set any format to the dates using date-fns module.
import { format } from 'date-fns'
// Calendar of react-date-range
import { DateRange } from 'react-date-range'

import Header from '../components/Header.jsx'
import SearchItem from '../components/SearchItem.jsx'

export default function List () {
  // Receiving data from Header.jsx, locally.
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date) // Calendar of react-date-range
  const [options, setOptions] = useState(location.state.options)

  const [openDate, setOpenDate] = useState(false)

  // console.log('location: ', location)

  return (
    <>
      <Header showHeaderTitleToHeaderSearch='no' />

      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='listTitle'>Search</h1>

            {/* Where are you going? */}
            <div className='listItem'>
              <label>Destination</label>
              <input placeholder={destination} type='text' />
            </div>

            {/* Calendar to set the date ranges. */}
            <div className='listItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {/* To set any format to the dates using date-fns module. */}
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
              </span>
              {
                openDate && (
                  // Calendar of react-date-range
                  <DateRange
                    onChange={item => { /* console.log('item: ', item); */ setDate([item.selection]) }}
                    minDate={new Date()}
                    ranges={date}
                  />
                )
              }
            </div>

            {/* Options of the room. */}
            <div className='listItem'>
              <label>Options</label>
              <div className='listOptions'>
                <div className='listOptionItem'>
                  <span className='listOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input type='number' className='listOptionInput' />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input type='number' className='listOptionInput' />
                </div>
                {/* Numerator for adult, children and room. */}
                <div className='listOptionItem'>
                  <span className='listOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='listOptionInput'
                    placeholder={options.adult}
                  />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='listOptionInput'
                    placeholder={options.children}
                  />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='listOptionInput'
                    placeholder={options.room}
                  />
                </div>

              </div>
            </div>
            <button>Search</button>
          </div>
          <div className='listResult'>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </>
  )
}
