import { Header, Simulator, Tables, Footer } from "./components";
import { GameObjectsProvider } from "./context";

function App() {
    return (
        <GameObjectsProvider>
            <div className="container mx-auto flex flex-col gap-y-6">
                <Header/>
                <Simulator/>
                <Tables/>
                <Footer/>
            </div>
        </GameObjectsProvider>
    )
}

export { App }