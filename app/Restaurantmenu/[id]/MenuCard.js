import React, { useState } from 'react'
import DetailMenuCards from './DetailMenuCards'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const MenuCard = ({ card }) => {


    const [isOpen, setIsOpen] = useState(card["@type"] ? true : false);

    function toggleFunction() {
        setIsOpen((preVal) => !preVal)
    }

    if (card.itemCards) {
        const { title, itemCards } = card;
        return (
            <div className='mt-7'>
                <div className='flex items-center justify-between'>
                    <h1 className={`${card["@type"] ? 'ml-4 font-bold text-xl' : 'ml-4 font-bold text-base'}`}>{title} ({itemCards.length})</h1>
                    {isOpen ? <IoIosArrowUp onClick={toggleFunction} className='text-2xl mr-4' /> : <IoIosArrowDown onClick={toggleFunction} className='text-2xl mr-4' />}

                </div>
               <div>
               {isOpen == false && <hr className={`${card["@type"] ? `my-5 border-[10px]` : `my-5 border-[1px] `}`} />}
               </div>
                {

                    isOpen && <DetailMenuCards itemCards={itemCards} />
                }
            </div>


        )
    } else {
        const { title, categories } = card
        return (
            <div>
                <h1 className='ml-4 font-bold text-[18px]'>
                    {title}
                </h1>
                {
                    categories.map((data) => (
                        <MenuCard card={data} />
                    ))
                }

            </div>
        )
    }

}


export default MenuCard
