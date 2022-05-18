import React from 'react'
import ActivityCard from './ActivityCard'

const Content = ({activity}) => {
  return (
    <>
        {activity?.map((activity) => (
            <div item key={activity.toString()}>
              <ActivityCard activity={activity} />
            </div>
          ))}
        
    </>
  )
}

export default Content