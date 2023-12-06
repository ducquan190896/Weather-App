import React from 'react'
import { DailyObj } from '../store/slices/slice.type'
import moment from 'moment'
import WeatherIcon from './WeatherIcon';

interface DayCardProp {
    day: DailyObj,
    selectedDay: Date,
    setIsSelectedDay: React.Dispatch<React.SetStateAction<Date>>
}

const today = new Date();
const DayCard = ({day, selectedDay, setIsSelectedDay}: DayCardProp) => {
    const isToday = moment(day.time).isSame(today, 'day');
    const isSelectedDay = moment(day.time).isSame(selectedDay, 'day');

    const handleClick = () => {
      setIsSelectedDay(new Date(day.time));
    }

  return (
    <div className={`${isSelectedDay ?  'w-[300px] h-[190px] ' : 'w-32 h-[120px] '} flex flex-col items-start justify-start bg-white px-2 py-2  border-gray-300 border-x-[1px]`} onClick={handleClick}>
        {/* <p className='text-white font-bold text-lg text-black'>{isToday ? "Today" : moment(day.time).format('ddd')}</p> */}
        <p className='text-black font-bold text-lg text-black'>
          {isToday ? "Today" :  moment(day.time).add(6, 'days').format('ddd Do')}
        </p>
        
        {isSelectedDay ? (
          <div className='flex flex-row items-start justify-start mt-8'>
            <div className='mt-2'>
              <WeatherIcon size={70} color={"#000"} weatherCode={day.weathercode ?? null}></WeatherIcon>
            </div>
            <div className='flex flex-col items-center justify-center ml-4 pr-4 mr-4  border-r-[1px] border-gray-400'>
              <p className='text-black text-2xl font-bold mb-6'>{day.temperature_2m_max.toFixed(0)}°</p>
              <p className='text-black text-2xl'>{day.temperature_2m_min.toFixed(0)}°</p>
            </div>
            <div className='flex-1 my-auto'>
              <p className='text-lg text-black'>{day.weathercode?.description}</p>
            </div>
          </div>
          ) : (
          <div className='flex flex-row items-start justify-start mt-2'>
            <div className='mt-2'>
              <WeatherIcon size={48} color={"#000"} weatherCode={day.weathercode ?? null}></WeatherIcon>
            </div>
            <div className='flex flex-col items-center justify-center ml-4'>
              <p className='text-black text-lg font-bold'>{day.temperature_2m_max.toFixed(0)}°</p>
              <p className='text-black text-lg'>{day.temperature_2m_min.toFixed(0)}°</p>
            </div>
          </div>
        )}
    </div>
  )
}

export default DayCard