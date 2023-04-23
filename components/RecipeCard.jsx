import React from 'react'
import DeleteIcon from '../assets/DeleteIcon'
import Apple from '../assets/Apple'

const Recipe = ({ id, name, numberIngredients, onClickFn }) => {

  return (
    <div className='flex items-center bg-gray-100 w-full pr-4 rounded ' onClick={onClickFn} >
      <div className='w-[52px] mr-4 h-[66px] bg-gray-600 rounded-l' >

      </div>
      <div className='flex flex-col' >
        <p>{name}</p>
        <p className='text-gray-500 text-sm' >You have {numberIngredients} ingredients</p>
      </div>

    </div>
  )
}

export default Recipe