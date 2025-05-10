import { Layout } from "./components";
import { Route, Routes } from "react-router";
import { HomePage } from "./HomePage.tsx";
import { Lab102Page } from "./lab102";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />}/>
                <Route path="/lab102" element={<Lab102Page />}/>
                <Route path="/lab307" element={<HomePage />}/>
            </Route>
        </Routes>
    )
}
