import { Provider } from 'react-redux'
import { createStore } from './store';
import { hydratePreloadedState } from './bootstrap/hydrate-store';
// import { store } from './store'


type Props = {
    children: React.ReactNode
}

export const store = createStore(hydratePreloadedState());

export function ReduxProvider({ children }: Props) {
    
    return <Provider store={store}>{children}</Provider>
}
