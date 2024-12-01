import React from 'react'

export default function OrderSummaryField({ fieldName, fieldValue }) {
    return (
        <div>
            <div className='flex items-center justify-between pt-4'>
                <div>
                    <p className='text-sm font-medium'>{fieldName}</p>
                </div>
                <p className='text-sm font-medium'>{fieldValue}</p>
            </div>
        </div>
    )
}
