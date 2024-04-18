import React, { useState } from 'react'
import './Header.css'
// Font Awesome - icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faPlane, faCar, faIcons, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
// Calendar of react-date-range
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
// To set any format to the dates
import { format } from 'date-fns'

export default function Header ({ isHome }) {
  // Calendar of react-date-range
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  // To show and hide the calendar of date range.
  const [openDate, setOpenDate] = useState(false)

  // Options of the room.
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })

  // Counter of click
  const handleDecreaseOptionsClick = (name) => {
    if (name === 'adult' || name === 'room') {
      setOptions(prev => ({
        ...prev,
        [name]: (prev[name] > 1) ? (prev[name] - 1) : 1
      }))
    }

    if (name === 'children') {
      setOptions(prev => ({
        ...prev,
        [name]: (prev[name] > 0) ? (prev[name] - 1) : 0
      }))
    }
  }

  const handleIncreaseOptionsClick = (name) => {
    setOptions(prev => ({
      ...prev,
      [name]: prev[name] + 1
    }))
  }

  return (
    <div className='header'>
      <div className='headerContainer'>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faIcons} />
            <span>Attractions</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {
          isHome && (
            <>
              <h1 className='headerTitle'>A lifetime of discount? It is Genius</h1>
              <p className='headerDescription'>Get rewarded for your travels unlock instant savings of 10% or more with a free asiel_booking account</p>
              <button className='headerBtn'>Sign in / Register</button>
              <div className='headerSearch'>
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faBed} className='headerIcon' />
                  <input type='text' placeholder='Where are you going?' className='headerSearchInput' />
                </div>

                {/* Calendar to set the date ranges. */}
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />

                  <span className='headerSearchText' onClick={() => setOpenDate(!openDate)}>
                    {/* To set any format to the dates */}
                    {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                  </span>

                  {
                    openDate &&
                      // Calendar of react-date-range
                      <DateRange
                        editableDateInputs
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className='date'
                      />
                  }
                </div>

                {/* Options of the room. */}
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                  <span className='headerSearchText' onClick={() => setOpenOptions(!openOptions)}>
                    {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                  </span>

                  {
                    openOptions && (
                      // Counter for adult, children and room.
                      <div className='options'>
                        <div className='optionItem'>
                          <span className='optionText'>Adult</span>
                          <div className='optionCounter'>
                            <button className='optionCounterButton' onClick={() => handleDecreaseOptionsClick('adult')}>-</button>
                            <span className='optionCounterNumber'>{options.adult}</span>
                            <button className='optionCounterButton' onClick={() => handleIncreaseOptionsClick('adult')}>+</button>
                          </div>
                        </div>
                        <div className='optionItem'>
                          <span className='optionText'>Children</span>
                          <div className='optionCounter'>
                            <button className='optionCounterButton' onClick={() => handleDecreaseOptionsClick('children')}>-</button>
                            <span className='optionCounterNumber'>{options.children}</span>
                            <button className='optionCounterButton' onClick={() => handleIncreaseOptionsClick('children')}>+</button>
                          </div>
                        </div>
                        <div className='optionItem'>
                          <span className='optionText'>Room</span>
                          <div className='optionCounter'>
                            <button className='optionCounterButton' onClick={() => handleDecreaseOptionsClick('room')}>-</button>
                            <span className='optionCounterNumber'>{options.room}</span>
                            <button className='optionCounterButton' onClick={() => handleIncreaseOptionsClick('room')}>+</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>

                <div className='headerSearchItem'>
                  <button className='headerBtn'>Search</button>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
