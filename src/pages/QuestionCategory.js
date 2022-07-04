import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
const QuestionCategory = () => {
  const [cats, setCats] = useState([]);
  const [category, setCategory] = useState('');
  const [difficultly, setDifficultly] = useState('');
  const [questionNum, setQuestionNum] = useState(0);

  const fetchQuestionCategories = async () => {
    const { data } = await axios.get("https://opentdb.com/api_category.php");
    setCats(data.trivia_categories);
  };

  useEffect(() => {
    fetchQuestionCategories();
  }, [])
  
  const history = useNavigate()
  const handleClick = () => {
    if (
      parseInt(questionNum) > 15 ||
      parseInt(questionNum) < 1 ||
      category === "" ||
      difficultly === ""
    ) {
        alert('Please give proper input !');
    } else {
        const url = `/question/${category}/${difficultly}/${questionNum}`;
        history(url);
    }
  };

  return (
    <section className="card">
      <h1 className="card-header">Quizzical</h1>
      <select
        name="category"
        className="card-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        
        <option value="">Select Category</option>
        {cats.map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          
          );
        })}
      </select>

      <select
        name="difficultly"
        className="card-select"
        onChange={(e) => setDifficultly(e.target.value)}
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        name="number"
        placeholder="Number Of Questions ( 1-15 )"
        type="number"
        className="card-input"
        min={1}
        max={15}
        onChange={(e) => setQuestionNum(e.target.value)}
      />

      <input
        type="submit"
        value="Start Quiz"
        className="card-btn"
        onClick={handleClick}
      />
    </section>
  );
};

export default QuestionCategory;
