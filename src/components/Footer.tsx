function Footer() {
    return (
        <div
            className="container px-4 flex flex-col items-center gap-y-2 mx-auto mt-6 py-4 border-t-2 border-accent rounded-xl">
            <p> <span className="font-bold">Physics Simulator</span> {(new Date()).getFullYear()} </p>
            <p className="text-sm">Made by <a href="https://github.com/TecHeReTiC3141" target="_blank"
                                                 className="italic hover:underline">TecHeReTiC</a> and
                <a href="https://github.com/arekalov" target="_blank"
                    className="italic hover:underline"> arekalov</a> with love and
                dedication</p>
        </div>
    )
}

export { Footer }
