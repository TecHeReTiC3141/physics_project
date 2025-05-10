import { GameObjectsProvider } from "./context";
import { Header, Simulator } from "./components";

export function Lab307Page() {
  return (
    <GameObjectsProvider>
      {/*<TableDataProvider>*/}
        <div className="container mx-auto flex flex-col gap-y-6">
          <Header/>
          <Simulator/>
          {/*<Tables/>*/}
        </div>
      {/*</TableDataProvider>*/}
    </GameObjectsProvider>
  )
}
