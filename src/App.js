import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "./component/main/Main";

function App() {
  const [characters, setCharacters] = useState([]);
  const [state, setState] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${state}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters([...data.results]);
      })
      .catch((error) => console.log(error));
  }, [state]);


  return (
    <>
      <Container>
      
          <>
            {characters.map((character) => (
              <CharacterBlock status={character.status}>
                <img src={character.image} alt={character.name} />
                <p>Name : {character.name}</p>

                <p>Gender: {character.gender}</p>
                <p>Episodes: {character.episode.length}</p>
              </CharacterBlock>
            ))}
            <BlockBtn>
              <button onClick={() => setState(state - 1)}> --Next page</button>

              <button onClick={() => setState(state + 1)}>Next page+</button>
            </BlockBtn>
          </>
        )
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 50px;
`;
const BlockBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 40px 0;
  gap: 30px;
  button {
    gap: 50%;
    width: 120px;
    height: 50px;
    background-color: skyblue;
    border-radius: 12px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    &:active {
      background-color: red;
      color: white;
    }
  }
`;
const CharacterBlock = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  ${(props) =>
    (props.status === "Alive" && `border: 3px solid blue;`) ||
    (props.status === "Dead" && `border: 3px solid red`) ||
    (props.status === "unknown" && `border:3px solid yellow`)}
`;
