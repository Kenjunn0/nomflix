import { atom, selector } from "recoil";

export type toDoType = string;

export const toDoState = atom<toDoType[]>({
    key: "toDo",
    default: ["a", "b", "c", "d", "e", "f"]
})