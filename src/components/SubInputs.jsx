import React from 'react'

function SubInputs({
    rowsInfo
}) {
    console.log(rowsInfo)
    return (
        <div className='mt-4' style={{display:"flex",flexDirection:"column"}} >
            {
                rowsInfo.map(value => {
                    return (
                        <div style={{marginLeft:"5em",paddingRight:"2em"}} className=''>
                            <label for={value.r_name} class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{value.r_name}</label>
                            <input style={{
                            }} value={value.r_value} onChange={e => value.setr_value(e.target.value)} type={value.r_type} id={value.r_name} class="dark bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={value.r_placeholder} required />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubInputs