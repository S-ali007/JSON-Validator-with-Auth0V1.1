import React from 'react'
import Header from './Header'
import Main_content from './Main_content'

function All_Components({uData}) {
  return (
    <div className='max-w-[1440px] w-full mx-auto px-3 py-1  '>
        <Header userProfile={uData}/>
        <Main_content />



    </div>
  )
}

export default All_Components
