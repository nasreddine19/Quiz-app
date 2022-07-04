import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../img/Infinity-1s-200px.svg";
import ShowResult from "../components/ShowResult";
const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false);
  const { category, difficultly, questionNum } = useParams();

  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const url = `https://opentdb.com/api.php?amount=${questionNum}&category=${category}&difficulty=${difficultly.toLowerCase()}&type=multiple`;

      const { data } = await axios.get(url);
      setQuestions(data.results);
      setAllAnswers(
        [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.log("Fetch Error=> ", error);
    }
    setLoading(false);
  };

  const getAnswer = (answer) => {
    questions[currentQuestionNum].userAnswer = answer;
    setSelected(answer);
  };

  const history = useNavigate();
  const resetGame = () => {
    history("/");
  };

  const showResult = () => {
    if (
      !questions[currentQuestionNum].userAnswer ||
      questions[currentQuestionNum].userAnswer === ""
    ) {
      alert("Please Select one answer !");
    }
    setResult(true);
  };

  const nextQuestion = () => {
    if (
      !questions[currentQuestionNum].userAnswer ||
      questions[currentQuestionNum].userAnswer === ""
    ) {
      alert("Please Select one answer !");
    }

    setAllAnswers(
      [
        ...questions[currentQuestionNum + 1].incorrect_answers,
        questions[currentQuestionNum + 1].correct_answer,
      ].sort(() => Math.random() - 0.5)
    );
    setCurrentQuestionNum(currentQuestionNum + 1);
  };

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-conatiner">
          <img src={Loader} alt="Loding..." />
        </div>
      ) : !result ? (
        <div>
          {questions.length > 0 && (
            <section className="card">
              <h2
                className="question-header"
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestionNum].question,
                }}
              ></h2>

              {allAnswers.map((answer, i) => {
                return (
                  <div
                    key={i}
                    className={
                      selected === answer ? "selected answer" : "answer"
                    }
                    onClick={(e) => getAnswer(answer)}
                  >
                    <p dangerouslySetInnerHTML={{ __html: answer }}></p>
                  </div>
                );
              })}

              <input
                className="card-btn"
                type="submit"
                value={
                  questions.length === currentQuestionNum + 1
                    ? "Show Result"
                    : "Next Question"
                }
                onClick={
                  questions.length === currentQuestionNum + 1
                    ? showResult
                    : nextQuestion
                }
              />

              <input
                className="card-btn"
                type="submit"
                value="Reset Game"
                onClick={resetGame}
              />
            </section>
          )}
        </div>
      ) : (
        <ShowResult questions={questions} resetGame={resetGame} />
      )}
    </>
  );
};
export default Questions;
