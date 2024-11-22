import React,{useState,useRef} from 'react'
import "./Mystyle.css"
import { data } from '../assets/data'

function Mock() {
  let [index,setIndex] =useState(0);
  let [question,setQuestion] =useState(data[index]);
  let [lock,setLock]=useState(false);
  let [result,setResult] = useState(false)
  let [score, setScore]=useState(0)
  let [feedback,setFeedback] =useState("")


  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let alterAns = [option1,option2,option3,option4]

  const clickAns=(e,ans)=>{
    if(lock===false){
    
      if(question.ans===ans){
       e.target.classList.add("correct")
       setLock(true)
       setScore(prev=>prev+1)
       setFeedback("Correct Answer")
      }else{
       e.target.classList.add("wrong")
       setLock(true)
       alterAns[question.ans-1].current.classList.add('correct')
       setFeedback("Wrong Answer")
      }
      }

    }

  

  const nextAns=()=>{
    if(lock===true){
      if(index===data.length-1){
        setResult(true)
        return 0
      }

      setIndex(++index);
      setQuestion(data[index])
      setLock(false);
      setFeedback("")
      alterAns.map((alter)=>{
        alter.current.classList.remove("wrong")
        alter.current.classList.remove("correct")
        return null
      })
    }
  }

  const reset=()=>{
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
    setFeedback("")
  }
    

  return (
    <div className='container' >
    <div className='content'>
      <h1 className='header'>Quiz</h1>
       {feedback && <p className='feedback'>{feedback}</p>}
      {result?<></>:<>  <h2 className='text'>{index+1}. {question.question}</h2>
      <ul className='list'>
        <li ref={option1} onClick={(e)=>{clickAns(e,1)}}>{question.option1}</li>
        <li ref={option2} onClick={(e)=>{clickAns(e,2)}}>{question.option2}</li>
        <li ref={option3} onClick={(e)=>{clickAns(e,3)}}>{question.option3}</li>
        <li ref={option4} onClick={(e)=>{clickAns(e,4)}}>{question.option4}</li>
      </ul>
      <div className='switch'>
      <button className='btn' onClick={nextAns}>Next</button>

      </div>
      <h2> {index+1} of Question   {data.length}</h2> </>}
      {result?<>
        <h2>You Scored {score} out Of {data.length}</h2>
      <button className='btn' onClick={reset}>Reset</button>
      </>:<></>}
     
     
    </div>


    </div>
  )

}


export default Mock
