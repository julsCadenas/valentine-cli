import React from 'react'
import TitleBar from './titlebar'
import Terminal from './terminal'

const Window = () => {
  return (
    <main className='h-[768px] w-[1366px] border-4 border-foreground flex flex-col px-3 relative items-center'>

        <TitleBar />
        <Terminal />

    </main>
  )
}

export default Window