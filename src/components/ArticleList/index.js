import React, {useState, useEffect} from 'react'
import { ArticleListPc } from './pcview';
import { ArticleList } from './mobileview/ArticleList';

export default function Decider() {

        const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
         const breakpoint = 620;
        useEffect(() => {
          const handleResize=()=>{
          setSize([window.innerHeight, window.innerWidth])
          return () =>{
            window.removeEventListener('resize', handleResize);
          }
        }
        window.addEventListener('resize', handleResize)
      },[])
      console.log("Decider_Size",size)
      
    return (
        <div>    
            {breakpoint ? <ArticleListPc/>:<ArticleList /> }
        </div>
    )
}
