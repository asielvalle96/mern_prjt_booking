import React, { useState } from 'react'
import './Header.css'
// Font Awesome - icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faPlane, faCar, faIcons, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
// Calendar of react-date-range
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
// To set any format to the dates using date-fns module.
import { format } from 'date-fns'
// react-router-dom
import { useNavigate } from 'react-router-dom'

export default function Header ({ showHeaderTitleToHeaderSearch }) {
  // Calendar of react-date-range
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  // Calendar of date range.
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

  const [destination, setDestination] = useState('') // Where are you going?
  const navigate = useNavigate()
  const handleSearch = () => {
    // Sending data to List.jsx, locally.
    navigate('/hotels', { state: { destination, date, options } })
  }

  return (
    <div className='header'>
      <div className={showHeaderTitleToHeaderSearch === 'si' ? 'headerContainer' : 'headerContainer listMode'}>
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
          showHeaderTitleToHeaderSearch === 'si' && (
            <>
              <h1 className='headerTitle'>A lifetime of discount? It is Genius</h1>
              <p className='headerDescription'>Get rewarded for your travels unlock instant savings of 10% or more with a free asiel_booking account</p>
              <button className='headerBtn'>Sign in / Register</button>
              <div className='headerSearch'>

                {/* Where are you going? */}
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faBed} className='headerIcon' />
                  <input
                    className='headerSearchInput'
                    type='text'
                    placeholder='Where are you going?'
                    onChange={e => { /* console.log('e: ', e); */ setDestination(e.target.value) }}
                  />
                </div>

                {/* Calendar to set the date ranges. */}
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                  <span className='headerSearchText' onClick={() => { setOpenDate(!openDate); if (openOptions) setOpenOptions(!openOptions) }}>
                    {/* To set any format to the dates using date-fns module. */}
                    {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                  </span>

                  {
                    openDate &&
                      // Calendar of react-date-range
                      <DateRange
                        className='date'
                        editableDateInputs
                        onChange={item => { /* console.log('item: ', item); */ setDate([item.selection]) }}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                      />
                  }
                </div>

                {/* Options of the room. */}
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                  <span className='headerSearchText' onClick={() => { setOpenOptions(!openOptions); if (openDate) setOpenDate(!openDate) }}>
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
                  <button className='headerBtn' onClick={handleSearch}>Search</button>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
