import { React, useState, useEffect } from "react";

const ShowResult = ({ resetGame, questions }) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10
      );
    }
    // eslint-disable-next-line
  }, []);
  return (
    <section className="card-result">
      <div className="marksheet-container">
      <h2>MarkSheet</h2>
      <p>Full Score: {questions.length * 10}</p>
      <p>Total Score: {score}</p>
      </div>
      {questions.map((que, ind) => {
        return (
          
          <section key={ind} className="card-result">    
            <div className="answer-que">
            <h3 dangerouslySetInnerHTML={{ __html: que.question }}></h3>

              <div className="answers-box">
              <p className="u-c-answers">Your Answer:</p>
              <p
                dangerouslySetInnerHTML={{ __html: que.userAnswer }}
                className={
                  que.userAnswer === que.correct_answer ? "correct" : "wrong"
                }
              ></p>
              
              <p className="u-c-answers">Correct Answer:</p>
              <p
                dangerouslySetInnerHTML={{ __html: que.correct_answer }}
                className="correct"
              ></p>
              </div>

              <p>
              <b>
                Mark: {que.userAnswer === que.correct_answer ? "10" : "00"}
              </b>
            </p>
            </div>
            
          </section>
          
        );
      })}

<input
        className="card-btn"
        type="submit"
        value="Reset Game"
        onClick={resetGame}
      />
      
    </section>
  );
};

export default ShowResult;
