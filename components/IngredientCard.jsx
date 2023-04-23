import React from 'react'
import DeleteIcon from '../assets/DeleteIcon'
import Apple from '../assets/Apple'

const IngredientCard = ({ id, ingredientName, expiryString, onClickFn, onDeleteFn }) => {


  return (
    <div className='flex items-center justify-between bg-gray-100 w-full p-4 rounded ' onClick={onClickFn} >
      <div className='flex items-center' >
        <div className='w-[40px] h-[40px] bg-gray-400 rounded mr-4 grid place-items-center' >
          <Apple className="text-gray-800" />
        </div>
        <div className='flex flex-col space-y-[2px]' >
          <p>{ingredientName}</p>
          <p className='text-gray-500' >Expires in {expiryString}</p>
        </div>
      </div>
      <div>
        <button onClick={onDeleteFn} className='w-[40px] h-[40px] bg-transparent grid place-items-center mr-4' >
          <DeleteIcon className='w-[28px] h-[28px]' />
        </button>
      </div>
    </div>
  )
}

export default IngredientCard