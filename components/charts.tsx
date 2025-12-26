import React from 'react'


type Props = {
    data?:{
        date: string;
        income:number;
        expense:number;
    }[]
}


export const Charts = ({data=[]}:Props) => {
  return (
    <div>Charts</div>
  )
}