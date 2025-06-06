import React from 'react'

function Task({ date, amount, particulars, childComponent }: { date: string, amount: string, particulars: string, childComponent: React.ReactElement }): React.ReactElement {
    return (
        <div className='flex mx-3 border-b-2 border-b-gray-800/50 shadow-xl rounded-lg text-gray-600 py-5 flex-col md:flex-row lg:flex-row justify-between mb-7 md:my-3 lg:my-3 gap-2.5 text-lg md:text-xl lg:text-xl'>
            <div>
                <span className='md:hidden lg:hidden'>Date: </span>
                <span>{date}</span>
            </div>
            <div>
                <span className='md:hidden lg:hidden'>Amount: </span>
                <span>{amount}</span>
            </div>
            <div className='md:w-1/2 lg:w-1/2 break-all'>
                <span className='md:hidden lg:hidden'>Particulars: </span>
                <span>{particulars}</span>
            </div>
            {childComponent}
        </div>
    )
}

export default Task
