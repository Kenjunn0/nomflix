import DraggableCard from "./DraggableCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  background-color:  ${props => props.theme.boardColor};
`

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => 
          props.isDraggingOver ? "pink" : props.isDraggingFromThisWith ? "red" : "blue" };
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThisWith: boolean;
}

interface IBoardProps {
    toDos: string[],
    boardId: string
}

function Board({ toDos, boardId } : IBoardProps) {

    return (
        <Wrapper>
            <Droppable droppableId={boardId}>
                {(provided , info) =>
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                                <DraggableCard key={toDo} toDo={toDo} index={index} />
                            )
                        )}
                        {provided.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;