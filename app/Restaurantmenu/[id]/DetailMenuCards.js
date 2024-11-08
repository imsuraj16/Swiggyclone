import React, { useState } from 'react'
import { TiStar } from "react-icons/ti";

const DetailMenuCards = ({ itemCards }) => {
    const veg = `https://packagingguruji.com/wp-content/uploads/2022/09/Veg-Logo-2.png`
    const nonVeg = `https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png`

    return (
        <div className='my-5'>
            {
                itemCards.map(({ card: { info: { name, defaultPrice, price, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } }, description="", imageId } } }) => {
                    const [isMore, setIsMore] = useState(false)
                    let trimdesc = description.substring(0, 130) + " ..."
                    return (
                        <>
                            <div className='w-full h-[200px] flex items-center justify-between'>
                                <div className='w-[70%]'>
                                    <img className='h-7' src={vegClassifier === 'VEG' ? veg : nonVeg}></img>
                                    <h2 className='font-bold text-[20px]'>{name}</h2>
                                    <p className='font-bold text-[15px]'>₹{defaultPrice / 100 || price / 100}</p>
                                    <p className='text-gray-600 flex'>
                                        {rating ? (
                                            <>
                                                <span className='mt-1 text-green-700'><TiStar /></span>
                                                {`${rating} (${ratingCountV2})`}
                                            </>
                                        ) : ''}
                                    </p>
                                    {description.length > 130 ?
                                        <div>
                                        <span className=' text-gray-600'>{isMore ? description : trimdesc}</span>
                                        <span>
                                        <button className='font-bold' onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                                        </span>
                                    </div> : <span className=' text-gray-600'>{description}</span>
                                    }
                                    

                                </div >

                                <div className='relative w-[20%]'>
                                    <img className='rounded-xl h-[150px] w-[160px] object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}></img>
                                    <button className='absolute bottom-[-10px] left-[40px] bg-white font-bold text-green-500 rounded px-7 py-1 border-2'>Add</button>
                                </div>
                            </div>
                            <hr className='my-2 ' />
                        </>
                    )



                })
            }
        </div>
    )
}

export default DetailMenuCards
