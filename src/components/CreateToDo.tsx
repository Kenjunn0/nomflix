import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {toDoState} from "../atom";

type IForm = {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register,
        handleSubmit,
        setValue }
        = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [...oldToDos, { text : toDo, id: Date.now(), category : "TO_DO"}])
    };

    return (
        <form onSubmit={handleSubmit(handleValid)} >
            <input {...register("toDo", {
                required : "please write a To Do",
            })}
                   placeholder="write a to do"
            />
            <button>Add</button>
        </form>
    )
}

export default CreateToDo;