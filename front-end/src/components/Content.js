import React from 'react'
import ActivityCard from './ActivityCard'

const Content = ({activity}) => {
  return (
    <>
        {activity?.map((activity) => (
            <div  key={activity.id}>
              <ActivityCard activity={activity} />
            </div>
          ))}
        
    </>
  )
}

export default Content