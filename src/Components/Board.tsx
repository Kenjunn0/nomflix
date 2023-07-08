import DraggableCard from "./DraggableCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import { useForm} from "react-hook-form";
import {IToDo, toDoState} from "../atom";
import {useSetRecoilState} from "recoil";

const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  background-color:  ${props => props.theme.boardColor};
`

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => 
          props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThisWith ? "#b2bec3" : "transparent" };
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;
  align-self: center;
`

const Form = styled.form`
  width: 100%;
  input {
    width: inherit;
  }
`

interface  IForm {
    toDo : string;
}

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThisWith: boolean;
}

interface IBoardProps {
    toDos: IToDo[],
    boardId: string
}

function Board({ toDos, boardId } : IBoardProps) {
    const { register, setValue, handleSubmit} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const onValid = (data:IForm) => {
        const newToDo = {
            id : Date.now(),
            text : data.toDo,
        }
        setToDos(allBoard => {
            return {
                ...allBoard,
                [boardId] : [
                    newToDo,
                    ...allBoard[boardId]
                ]
            }
        });
        setValue("toDo", "");
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required : true})} type="text" placeholder={`Add Task on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided , info) =>
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                                <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
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