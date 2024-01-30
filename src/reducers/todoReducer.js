const todoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'DELETE_TODO': 
            return state.filter(todo => todo.id !== action.payload);
        case 'EDIT_TODO': {
            let editedTodos = state.map(todo =>  
                todo.id === action.payload.id ? { ...todo, text: action.payload.text} : todo
            );
            return editedTodos;
        }
        case 'TOGGLE_TODO':
            return state.map(todo =>
              todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        default: 
            return state;
    }
};

export default todoReducer;