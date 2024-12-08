import { Header, Simulator, Tables } from "./components";
import { GameObjectsProvider } from "./context";

function App() {
    return (
        <GameObjectsProvider>
            <div className="container mx-auto flex flex-col gap-y-6">
                <Header/>
                <Simulator/>
                <Tables/>
            </div>
        </GameObjectsProvider>
    )
}

export { App }