import { GameObjectsProvider, TableDataProvider } from "./context";
import { Header, Simulator, Tables } from "./components";
import { PointsContextProvider } from "./context/PointsContext.tsx";

export function Lab307Page() {
    return (
        <PointsContextProvider>
            <GameObjectsProvider>
                <TableDataProvider>
                    <div className="container mx-auto flex flex-col gap-y-6">
                        <Header/>
                        <Simulator/>
                        <Tables/>
                    </div>
                </TableDataProvider>
            </GameObjectsProvider>
        </PointsContextProvider>
    )
}
