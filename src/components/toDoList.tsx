import { useForm } from "react-hook-form";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

type IForm = {
    toDo: string;
}

type IToDo = {
    text: string;
    id: number;
    category : "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

function ToDoList () {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register,
        handleSubmit,
        setValue }
        = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [...oldToDos, { text : toDo, id: Date.now(), category : "TO_DO"}])
        console.log(toDos)

    };

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)} >
                <input {...register("toDo", {
                    required : "please write a To Do",
                       })}
                placeholder="write a to do"
                />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>
                        {toDo.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList;



// type IFormData = {
//     errors: {
//         email: {
//             message: string;
//         };
//     };
//     firstName: string;
//     lastName: string;
//     userName: string;
//     email: string;
//     password: string;
//     passwordConfirm: string;
//     extraError?: string;
// };
//
// function ToDoList() {
//
//     const {
//         register : registerLogin,
//         watch : watchLogin,
//         handleSubmit : handleLoginSubmit,
//         formState : { errors : loginErrors },
//         setError : setLoginError,
//     } = useForm<IFormData>();
//     const onValid = (data : IFormData) => {
//         if (data.password !== data.passwordConfirm){
//             setLoginError("passwordConfirm",
//                 {message: "Password are not the same"},
//                 {shouldFocus: true}
//             );
//         }
//     }
//
//     console.log(loginErrors);
//
//     return <div>
//         <h1>To Dos</h1>
//         <form
//             style={{display : "flex", flexDirection : "column"}}
//             onSubmit={handleLoginSubmit(onValid)}
//         >
//             <input {...registerLogin("email", {
//                 required: true,
//                 pattern: {
//                     value: /^[A-Za-z0-9._%+-]+@naver.com/,
//                     message: "Only naver.com can use for login"
//                 }
//             }) } placeholder="Email" />
//             <span>{loginErrors?.email?.message}</span>
//
//             <input {...registerLogin("firstName" , {
//                 required: true,
//                 validate: {
//                     noNico : (value) => value.includes("nico") ? "no nico allowed" : "good"
//                    }
//             }) } placeholder="First Name" />
//             <span>{loginErrors?.firstName?.message}</span>
//             <input {...registerLogin("lastName" , {required: true}) } placeholder="Last Name" />
//             <input {...registerLogin("password" , {required: true}) } placeholder="Password" />
//             <input {...registerLogin("userName" , {required: true}) } placeholder="User Name" />
//             <input {...registerLogin("passwordConfirm" , {required: true}) } placeholder="Password Confirm" />
//             <button>Add</button>
//         </form>
//     </div>
// }
//
// export default ToDoList;