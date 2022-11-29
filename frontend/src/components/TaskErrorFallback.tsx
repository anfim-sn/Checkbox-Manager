import React from 'react'

export const TaskErrorFallback = ({ error }: { error: unknown }) => {
  console.log(error)
  return (
    <div>
      {/*@ts-ignore*/}
      <p>Some error:</p>
      <button onClick={() => location.reload()}>F5</button>
    </div>
  )
}
