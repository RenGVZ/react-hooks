// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// function expensiveFunc() {
//   console.log(`Expensive computation: ${Math.floor(Math.random() * 100)}`);
//   return 0;
// }

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(() => expensiveFunc())
  const [name, setName] = React.useState(() => window.localStorage.getItem('name') ?? initialName)
  const [count, setCount] = React.useState(0)


  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  const doSomethingAsync = () => {
    return new Promise(resolve => setTimeout(resolve, 5000))
  }

  const increment = async () => {
    console.log('increment outer press, count: ', count)
    await doSomethingAsync()
    console.log('increment inner press, count: ', count)
    setCount(count => count + 1)
    console.log('increment press after setCount, count: ', count)
  }
  return (
    <div>
      <button onClick={increment}>{count}</button>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
