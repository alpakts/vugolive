'use client';
import React, { useEffect } from 'react'

const Page = () => {
    const buttonRef = React.useRef(null);
    useEffect(() => {
        console.log('Page mounted');
        alert('Page mounted');
        
        window.document.body.style.backgroundColor = 'red';
        return () => {
            alert('Page unmounted');
            console.log('Page unmounted');
        }
    }, []);
  return (
    <div>Page
    <button onClick={()=>{
        buttonRef.current.style.backgroundColor = 'blue';
    }} ref={buttonRef}>test</button>
    </div>
  )
}

export default Page