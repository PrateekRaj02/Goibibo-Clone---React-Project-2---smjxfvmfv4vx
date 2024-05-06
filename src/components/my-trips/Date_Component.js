import React from 'react';

export const Date_Component = ({ dateVal, type, setterFnc }) => {
  let date = new Date(dateVal);
  if(type === 'today'){
    date = new Date();
  }
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const formattedDateFlights = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short', 
    year: '2-digit'
  });

  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  const dayOfWeekFlights = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    
    if(type=='departure' || type=='return'){
      return setterFnc(formattedDateFlights)
    }
    else if(type=='shortDay' && typeof setterFnc === 'function' ){
      return setterFnc(() => dayOfWeek);
    }
    else if(type=='today'){
      return setterFnc(formattedDateFlights)
    }
    else if(type=="shortDay"){
      return dayOfWeek;
    }
    else{
      return formattedDate;
    }

}