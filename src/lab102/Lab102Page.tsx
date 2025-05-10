import { GameObjectsProvider, TableDataProvider } from "./context";
import { Header, Simulator, Tables } from "./components";

export function Lab102Page() {
  return (
    <GameObjectsProvider>
      <TableDataProvider>
        <div className="container mx-auto flex flex-col gap-y-6">
          <Header/>
          <Simulator/>
          <Tables/>
        </div>
      </TableDataProvider>
    </GameObjectsProvider>
  )
}
