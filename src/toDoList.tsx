import {useState} from "react";

function ToDoList() {
    const [value, setValue] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const { currentTarget : { value } } = event;
    }
    return <div>
        <form>
            <input placeholder="write a to do" />
            <button>Add</button>
        </form>
    </div>
}