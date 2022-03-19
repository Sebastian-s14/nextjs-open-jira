import { UIState } from './'

type UIActiontype =
    | { type: '[UI] - Open Sidebar' }
    | { type: '[UI] - Close Sidebar' }
    | { type: '[UI] - Set isAddingEntry'; payload: boolean }
    | { type: '[UI] - Start Dragging'; payload: boolean }
    | { type: '[UI] - End Dragging'; payload: boolean }

export const uiReducer = (state: UIState, action: UIActiontype): UIState => {
    switch (action.type) {
        case '[UI] - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true,
            }
        case '[UI] - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false,
            }

        case '[UI] - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }
        case '[UI] - Start Dragging':
            return {
                ...state,
                isDragging: true,
            }
        case '[UI] - End Dragging':
            return {
                ...state,
                isDragging: false,
            }

        default:
            return state
    }
}
