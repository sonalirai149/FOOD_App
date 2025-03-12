import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err= useRouteError();
    console.log(err); //object
  return (
    <div>
      <h2>Ooopss!!!!!</h2>
      <h1>Something went wrong?</h1>
      <h2>{err.status}: {err.statusText}</h2>
    </div>
  )
}

export default Error
