import React from 'react'

const TitleBar = () => {
  return (
    <main className='h-12 flex items-center py-3'>

        {/* control buttons MacOS style */}
        <section className='absolute left-4 flex gap-2'>
            <div className='w-4 h-4 bg-red-500 rounded-full'></div>   {/* close */}
            <div className='w-4 h-4 bg-yellow-500 rounded-full'></div> {/* minimize */}
            <div className='w-4 h-4 bg-green-500 rounded-full'></div>  {/* maximize */}
        </section>

        {/* message */}
        <section className='absolute left-1/2 -translate-x-1/3 md:-translate-x-1/2 text-base md:text-lg'>
            <strong>Happy Valentine's Day!</strong>
        </section>

    </main>
  )
}

export default TitleBar