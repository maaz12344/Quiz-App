import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import { Link } from "react-router-dom";
import blast from './blast.mp3';
import wrong from './wrong.mp3'
const Quiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(10);
    const [quizOver, setQuizOver] = useState(false);
    const [correctAns, setCorrectAns] = useState(false);
    const [playSound] = useSound(blast);
    const [wrongSound] = useSound(wrong);
    useEffect(() => {
        fetch("http://localhost:4000/api/questions")
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Error fetching quiz data:", error));
    }, []);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [time]);

    const handleNextQuestion = () => {
        setCorrectAns(false)
        if (currentQuestion < questions.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTime(10); // Reset time for the next question
        } else {
            setQuizOver(true);
        }
    };

    const handleAnswerOptionClick = (isCorrect) => {
        console.log(isCorrect);
        if (isCorrect) {
            setScore(score + 1);
        }
        setCorrectAns(true)
        setTimeout(() => {
            handleNextQuestion();
        }, 4000);
    };

    if (quizOver) {
        return (
            <div className="quiz-over">
                <h1>Quiz Over</h1>
                <p>Your score is {score} out of {questions.questions.length}</p>
                <Link to="/">
                    <button className="start-button">Play again</button>
                </Link>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Main_container">
            <div className="quiz" >
                <h1>Quiz</h1>
                <h1>Name:{props.name}</h1>
                <div className="question-section">
                    <div className="question-count">
                        <span>Question {currentQuestion + 1}</span>/{questions.questions.length}
                    </div>
                    <div className="timer">Time left: {time} seconds</div>
                    <div className="question-text">Question: {questions.questions[currentQuestion].description}</div>
                </div>
                <div className="answer-section">
                    {questions.questions[currentQuestion].options.map((answerOption, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (answerOption.is_correct) {
                                    playSound();
                                }
                                else {
                                    wrongSound()
                                }
                                handleAnswerOptionClick(answerOption.is_correct);
                            }}
                            style={{
                                backgroundColor: correctAns
                                    ? answerOption.is_correct
                                        ? 'green'
                                        : 'red'
                                    : 'blue'
                            }}
                        >
                            {answerOption.description}
                        </button>
                    ))}
                </div>

                {correctAns === false ? (
                    <div>
                        <h1>Please Select an Option</h1>
                    </div>
                ) : (
                    <div>
                        <h1>
                            Correct Option is:{" "}
                            {questions.questions[currentQuestion].options
                                .filter(answer => answer.is_correct)
                                .map(answer => answer.description)
                                .join(", ")}
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;