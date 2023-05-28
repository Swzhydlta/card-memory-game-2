import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Card1Background from "../assets/card-1.svg";
import Card2Background from "../assets/card-2.svg";
import Card3Background from "../assets/card-3.svg";
import Card4Background from "../assets/card-4.svg";
import Card5Background from "../assets/card-5.svg";
import Card6Background from "../assets/card-6.svg";
import Card7Background from "../assets/card-7.svg";
import Card8Background from "../assets/card-8.svg";
import Card9Background from "../assets/card-9.svg";
import Card10Background from "../assets/card-10.svg";
import Card1Complete from "../assets/card-1-complete.svg";
import Card2Complete from "../assets/card-2-complete.svg";
import Card3Complete from "../assets/card-3-complete.svg";
import Card4Complete from "../assets/card-4-complete.svg";
import Card5Complete from "../assets/card-5-complete.svg";
import Card6Complete from "../assets/card-6-complete.svg";
import Card7Complete from "../assets/card-7-complete.svg";
import Card8Complete from "../assets/card-8-complete.svg";
import Card9Complete from "../assets/card-9-complete.svg";
import Card10Complete from "../assets/card-10-complete.svg";
import Card1Turned from "../assets/card-1-turned.svg";
import Card2Turned from "../assets/card-2-turned.svg";
import Card3Turned from "../assets/card-3-turned.svg";
import Card4Turned from "../assets/card-4-turned.svg";
import Card6Turned from "../assets/card-6-turned.svg";
import Bee from "../assets/img-bee.svg";

function Game() {
  // Set state for all game variables (most are empty as they get set with values in the useEffect below)
  const [cards, setCards] = useState();
  const [asset, setAsset] = useState([
    { name: "card1", background: Card1Background, complete: Card1Complete },
    { name: "card2", background: Card2Background, complete: Card2Complete },
    { name: "card3", background: Card3Background, complete: Card3Complete },
    { name: "card4", background: Card4Background, complete: Card4Complete },
    { name: "card5", background: Card5Background, complete: Card5Complete },
    { name: "card6", background: Card6Background, complete: Card6Complete },
    { name: "card7", background: Card7Background, complete: Card7Complete },
    { name: "card8", background: Card8Background, complete: Card8Complete },
    { name: "card9", background: Card9Background, complete: Card9Complete },
    { name: "card10", background: Card10Background, complete: Card10Complete },
  ]);
  const [game, setGame] = useState();
  const [flippedCards, setFlippedCards] = useState();
  const [tries, setTries] = useState();
  const [wonOrLost, setWonOrLost] = useState();
  const [startAgain, setStartAgain] = useState();
  const [roundsPlayed, setRoundsPlayed] = useState();
  const [moveMade, setMoveMade] = useState();
  const [hasClickedReplay, setHasClickedReplay] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  //  Set state to local storage values if they exist and hard-coded values otherwise
  useEffect(() => {
    // Destringify the stored state
    const storedValue = localStorage.getItem("gameState");
    // If storedValue is not empty, set state to its values
    if (storedValue) {
      const parseStoredState = JSON.parse(storedValue);

      // Set state to local storage values
      setCards(parseStoredState.cards);
      setGame(parseStoredState.game);
      setFlippedCards(parseStoredState.flippedCards);
      setTries(parseStoredState.tries);
      setWonOrLost(parseStoredState.wonOrLost);
      setStartAgain(parseStoredState.startAgain);
      setRoundsPlayed(parseStoredState.roundsPlayed);
      setMoveMade(parseStoredState.moveMade);
      // Else set hard-coded values
    } else {
      setCards([
        {
          id: 1,
          icon: Card1Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 1,
          timesFlipped: 0,
        },
        {
          id: 2,
          icon: Card1Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 1,
          timesFlipped: 0,
        },
        {
          id: 3,
          icon: Card2Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 2,
          timesFlipped: 0,
        },
        {
          id: 4,
          icon: Card2Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 2,
          timesFlipped: 0,
        },
        {
          id: 5,
          icon: Card3Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 3,
          timesFlipped: 0,
        },
        {
          id: 6,
          icon: Card3Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 3,
          timesFlipped: 0,
        },
        {
          id: 7,
          icon: Card4Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 4,
          timesFlipped: 0,
        },
        {
          id: 8,
          icon: Card4Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 4,
          timesFlipped: 0,
        },
        {
          id: 9,
          icon: Card6Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 5,
          timesFlipped: 0,
        },
        {
          id: 10,
          icon: Card6Turned,
          visible: false,
          solved: false,
          beingSolved: false,
          iconId: 5,
          timesFlipped: 0,
        },
      ]);
      setGame(true);
      setFlippedCards(0);
      setTries(10);
      setWonOrLost("");
      setStartAgain(false);
      setRoundsPlayed(0);
      setMoveMade(0);
    }
  }, []);

  // Function for shuffling the cards
  function shuffleGivenArray(array) {
    // Create a new array to avoid modifying the original array
    const newArray = [...array];
    let currentIndex = newArray.length;

    // While there are elements to shuffle
    while (currentIndex > 0) {
      // Pick a remaining element randomly
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap the current element with the randomly picked element
      const temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return newArray;
  }

  //   Function for calculating accuracy, which runs after each round
  function calculateAccuracy(array) {
    // Sort the cards array
    const arrayCopy = [...array];
    const sortedArray = arrayCopy.sort((a, b) => a.id - b.id);

    let totalAccuracy = 0;
    let pairCount = 0;

    for (let i = 0; i < sortedArray.length; i += 2) {
      // Get the average of the times each card in a given pair has been flipped
      const averageTimesFlipped =
        (sortedArray[i].timesFlipped + sortedArray[i + 1].timesFlipped) / 2;

      // Get the accuracy for that pair by dividing 1 by averageTimesflipped (results in a score out of 1 with the highest being 1)
      const pairAccuracy =
        averageTimesFlipped !== 0 ? 1 / averageTimesFlipped : 0;
      totalAccuracy += pairAccuracy;
      pairCount++;
    }

    // Get the overall accuracy by dividing the total accuracy by the amount of pairs
    const overallAccuracy = Math.round((totalAccuracy / pairCount) * 100);
    setAccuracy(overallAccuracy);
  }

  // Replay function that runs when user clicks replay button. It changes the "game" state variable
  // which runs the useEffect below this function
  function replay() {
    setGame(true);
    setHasClickedReplay(true);
    setCards((prevCards) =>
      prevCards.map((card) => {
        return { ...card, timesFlipped: 0 };
      })
    );
    setAccuracy(0);
  }

  //   UseEffect for handling game state when user has no local storage and when they click replay.
  // If they open the app with no local storage and when they click replay, it resets the game to a new game by shuffling etc.
  // If the user does have local storage, this useEffect does not run on page load
  useEffect(() => {
    const storedValue = localStorage.getItem("gameState");

    // If game is true on screen load
    if (game) {
      // If user has no local storage
      if (!storedValue) {
        // Reset all cards and shuffle them
        const cardArray = [...cards];
        const resetCards = cardArray.map((card) => {
          return { ...card, solved: false, visible: false, beingSolved: false };
        });
        const shuffledCards = shuffleGivenArray(resetCards);
        setCards(shuffledCards);
        // Set other variables necessary for game functionality
        setWonOrLost("");
        setTries(10);
        setStartAgain(false);
        // Else if user has clicked the replay button
      } else if (hasClickedReplay) {
        // Reset all cards and shuffle them
        const cardArray = [...cards];
        const resetCards = cardArray.map((card) => {
          return { ...card, solved: false, visible: false, beingSolved: false };
        });
        const shuffledCards = shuffleGivenArray(resetCards);
        setCards(shuffledCards);
        // Set other variables necessary for game functionality
        setWonOrLost("");
        setTries(10);
        setStartAgain(false);
        setHasClickedReplay(false);
        // moveMade controls a useEffect at the bottom that pushes state to local storage
        setMoveMade((prev) => prev + 1);
      }
    }
  }, [game]);

  // This function runs when a user clicks a card and flips it
  function setCardToVisible(card) {
    // This if statement only allows card flipping during an active game
    if (game) {
      // This if statement prevents the code within it from running if user clicks same card twice
      if (card.beingSolved === false && card.solved === false) {
        // This if prevents the code within it from running if the user tries to click more than two cards in a turn
        if (flippedCards < 2) {
          // Update the given cards in the array so that they get flipped over
          setCards((prevCards) =>
            prevCards.map((prevCard) => {
              if (prevCard.id === card.id) {
                return {
                  ...prevCard,
                  visible: true,
                  beingSolved: true,
                  timesFlipped: prevCard.timesFlipped + 1,
                };
              }
              return prevCard;
            })
          );
          setFlippedCards((prev) => prev + 1);
        }
      }
    }
    setMoveMade((prev) => prev + 1);
  }

  // This useEffect handles card matching and solving.
  // It runs each time a card is clicked, and checks if two cards are visible.
  // If so, it checks if they match, and sets their "solved" property to true.
  // If they dont match, it sets their "visible" property back to false
  useEffect(() => {
    const cardsArray = cards;
    if (flippedCards === 2) {
      // Get the two visible cards
      const activeCards = cardsArray.filter(
        (card) => card.beingSolved === true
      );
      const card1 = activeCards[0];
      const card2 = activeCards[1];
      // Check if the two visible cards have the same icon and set them to solved if so
      if (card1.iconId === card2.iconId) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.visible === true) {
                return {
                  ...card,
                  solved: true,
                  beingSolved: false,
                };
              }
              return card;
            })
          );
          setTries((prevTries) => prevTries - 1);
          setFlippedCards(0);
          setMoveMade((prev) => prev + 1);
        }, 1000);
        // Flip them back over if not
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => {
              if (card.id === card1.id || card.id === card2.id) {
                return { ...card, visible: false, beingSolved: false };
              }
              return card;
            })
          );
          setTries((prevTries) => prevTries - 1);
          setFlippedCards(0);
          setMoveMade((prev) => prev + 1);
        }, 1000);
      }
    }
  }, [flippedCards]);

  // This useEffect handles whether a game has been won or lost
  useEffect(() => {
    const cardsArray = cards;
    const hasSolvedAll = cardsArray?.every((obj) => obj.solved === true);
    // If the user has solved all cards if tries are above 0, they win, and state updates accordingly
    if (hasSolvedAll) {
      setGame(false);
      setWonOrLost("You won!");
      setStartAgain(true);
      setRoundsPlayed((prev) => prev + 1);
      calculateAccuracy(cardsArray);
      // Else they lose, and state updates accordingly
    } else {
      if (tries === 0) {
        setGame(false);
        setWonOrLost("You lost!");
        setStartAgain(true);
        setRoundsPlayed((prev) => prev + 1);
        calculateAccuracy(cardsArray);
      }
    }
  }, [tries]);

  //   This useEffect runs every time a user interacts with the game in any way, and pushes game state to local storage
  useEffect(() => {
    if (moveMade > 0) {
      const gameState = {};
      gameState["cards"] = cards;
      gameState["game"] = game;
      gameState["flippedCards"] = flippedCards;
      gameState["tries"] = tries;
      gameState["wonOrLost"] = wonOrLost;
      gameState["startAgain"] = startAgain;
      gameState["roundsPlayed"] = roundsPlayed;
      gameState["moveMade"] = moveMade;
      localStorage.setItem("gameState", JSON.stringify(gameState));
    }
  }, [moveMade]);

  return (
    <Container>
      <Row id="hero-row-mobile" className="pt-4">
        <Col>
          <Row>
            <span id="hero-text-mobile">
              <strong>Buy & sell</strong> premium, pre-loved fashion for little
              ones!
            </span>
          </Row>

          <Row id="bee-legend-row-mobile">
            <Col id="legend-mobile">
              <div>Moves left: {tries}</div>
              <div>Moves taken: {10 - tries}</div>
              <div>Rounds played: {roundsPlayed}</div>
              <div>Accuracy: {accuracy}</div>
            </Col>
            <Col id="bee-mobile-col">
              <Row>
                <Col id="outcome-col-mobile">
                  <div id="outcome-mobile">{wonOrLost ? wonOrLost : ""}</div>
                </Col>
                <Col>
                  <img id="bee-mobile" src={Bee} alt="bee"></img>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row id="mix-match-replay-row-mobile">
            <Col align="end" className="mt-2">
              {startAgain ? (
                <Button className="replay" onClick={replay}>
                  Replay
                </Button>
              ) : (
                <span id="mix-and-match-mobile">
                  Mix & match the tiles<br></br> to reveal a suprise!
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col align="end" className="mt-2"></Col>
          </Row>
        </Col>
      </Row>
      <Row id="card-row" className="pt-5">
        <Col md={8}>
          <Row>
            {cards?.map((card, index) => (
              <Col key={card.id} className="card-col">
                <div
                  className="card-div"
                  onClick={() => setCardToVisible(card)}
                >
                  {/* back of card */}
                  {!card.visible && !card.solved && (
                    <img
                      className="card-back"
                      src={asset[index].background}
                      alt="background"
                    ></img>
                  )}
                  {/* front of card */}
                  {card.visible && !card.solved && (
                    <img
                      className="card-turned"
                      src={card.icon}
                      alt="icon"
                    ></img>
                  )}
                  {/* solved card */}
                  {card.visible && card.solved && (
                    <img
                      className="card-complete"
                      src={asset[index].complete}
                      alt="solved"
                    ></img>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4} id="hero-col-desktop">
          <Row>
            <Col>
              <div id="outcome-desktop">{wonOrLost ? wonOrLost + "!" : ""}</div>
            </Col>

            <Col
              lg={7}
              id="mix-and-match-col-desktop"
              className="pe-4"
              align="end"
            >
              {startAgain ? (
                <Button className="replay" onClick={replay}>
                  Replay
                </Button>
              ) : (
                <span id="mix-and-match">
                  Mix & match the tiles to reveal a suprise!
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col id="legend-desktop">
              <div>Moves left: {tries}</div>
              <div>Moves taken: {10 - tries}</div>
              <div>Rounds played: {roundsPlayed}</div>
              <div>Accuracy: {accuracy}</div>
            </Col>
            <Col align="end" className="bee-desktop-col mt-lg-5">
              <img id="bee-desktop" src={Bee} alt="bee"></img>
            </Col>
          </Row>
          <Row className="mt-lg-4">
            <Col>
              <span id="hero-text-large-screen">
                The perfect place to <strong>buy & sell</strong> premium,
                pre-loved fashion for little ones!
              </span>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <span id="sub-hero-text">
                <strong>
                  Delivering something<br></br> sweet, real soon!
                </strong>{" "}
                Join the hive to stay in the loop!
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row id="delivering-soon-row-mobile" className="mt-3">
        <Col className="pe-5" xs={10}>
          <span>
            <strong>
              Delivering something<br></br> sweet, real soon!
            </strong>
            Join the<br></br> hive to stay in the loop!
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
