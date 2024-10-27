import React from 'react'

const Loading = ({className}) => {
  return (
    <div className={` min-h-screen min-w-full ${className}  `}>
    <div className={`flex justify-center items-center min-h-screen ${className} `}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
</div>
  )
}

export default Loading