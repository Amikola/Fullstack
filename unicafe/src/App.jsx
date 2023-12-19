import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine  = ({text, count}) => (
  <tr>
  <td>{text} </td> 
  <td>{count}</td>
  </tr>
  
)

const Statastics = ({good, bad, neutral}) => {
  if(good === 0 && bad === 0 && neutral === 0){
    return (
    <div>
    <p>No feedback given</p>
    </div> )
  }else{

    const average = (good - bad)/(good + bad + neutral)
    const positive = `${((good)/(good + bad + neutral))*100} %`
    return(
    <table>
       <tbody>
      <StatisticLine text='good' count={good} />
      <StatisticLine text='neutral' count={neutral} />
      <StatisticLine text='bad' count={bad} />
      <StatisticLine text='all' count={bad + good + neutral} />
      <StatisticLine text='average' count={average} />
      <StatisticLine text='positive' count={positive}/>
      </tbody>
    </table>
    
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const goodClick = () => {
    const next = good + 1
    setGood(next)
  }
  
  const badClick = () => {
    const next = bad + 1
    setBad(next)
  }

  const neutralClick = () => {
    const next = neutral + 1
    setNeutral(next)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={goodClick} text='Good' />
      <Button handleClick={neutralClick} text='Neutral' />
      <Button handleClick={badClick} text='Bad' />
      <h1>Statastics</h1>
      <Statastics good={good} bad={bad} neutral={neutral} /> 
    </div>
  )
}

export default App