import { Header, Simulator, Tables, Footer } from "./components";
import { GameObjectsProvider, TableDataProvider } from "./context";

function App() {
    return (
        <GameObjectsProvider>
            <TableDataProvider>
                <div className="container mx-auto flex flex-col gap-y-6">
                    <Header/>
                    <Simulator/>
                    <Tables/>
                    <Footer/>
                </div>
            </TableDataProvider>
        </GameObjectsProvider>
    )
}

export { App }