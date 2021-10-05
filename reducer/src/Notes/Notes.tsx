import { useReducer, useState, FormEvent,  FC } from 'react'

type Note = {
    id: number,
    note: String
}

type Action = {
    type: string,
    payload?: any
}

type ActionTypes = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE'
}

const actionType: ActionTypes = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE'
}

const initialNotes: Note[] = [
    {
        id: 1,
        note: 'Eat potato'
    },
    {
        id: 2,
        note: 'Eat tomato'
    }
]

const reducer = (state: Note[], action: Action) => {
    switch (action.type) {
        case actionType.ADD:
            return [...state, action.payload]
            break;
        case actionType.DELETE:
            return state.filter(note => note.id !== action.payload)
            break;
        case actionType.UPDATE:
            const updatedNote = action.payload;
            return state.map((n: Note) => n.id === updatedNote.id ? updatedNote : n)
            break;

        default:
            return state
            break;
    }
}

const Notes: FC = () => {

    const [notes, dispatch] = useReducer(reducer, initialNotes)
    const [note, setNote] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newNote = {
            id: Date.now(),
            note
        }
        dispatch({ type: actionType.ADD, payload: newNote })
    }

    const handleInput = (e:any )=> setNote(e.target.value)


    const handleDelete = (n: Note) => () => {
        dispatch({
            type: actionType.DELETE,
            payload: n.id
        })

    }
    const handleUpdate = (n: Note) => () => {
        dispatch({
            type: actionType.UPDATE,
            payload: { ...n, note }
        })

    }


    return <>
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((n: Note) => (
                    <li key={n.id}>
                        {n.note}
                        <button
                            onClick={handleDelete(n)}
                        >
                            X
                        </button>
                        <button onClick={handleUpdate(n)}>
                            Update
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder='New Note' value={note} onChange={handleInput} />
            </form>
        </div>
    </>
}

export default Notes
