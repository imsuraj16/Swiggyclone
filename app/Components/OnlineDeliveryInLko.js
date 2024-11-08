import React from 'react'
import RestaurantCards from './RestaurantCards'


const OnlineDeliveryInLko = ({data}) => {
  return (
    <div>
        <h1 className='font-extrabold text-2xl mt-5 mb-6'>Restaurants with online food delivery in Lucknow</h1>
        <div className='grid grid-cols-4 gap-5'>
        {data.map(({info,cta:{link}},i) => (
          <div key={i} className="hover:scale-90 duration-500 cursor-pointer " style={{ translate: `-${scroll}%` }}>
           <RestaurantCards info={{ ...info, link }}/>
          </div>
        ))}
        </div>
       
    </div>
  )
}

export default OnlineDeliveryInLko
