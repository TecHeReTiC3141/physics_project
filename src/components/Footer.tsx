function Footer() {
    return (
        <div
            className="container px-4 flex flex-col items-center gap-y-2 mx-auto mt-6 py-4 border-t-2 border-gray-500 rounded-xl">
            <p className="">{(new Date()).getFullYear()}. <span className="font-bold">Employee Dashboard</span></p>
            <p className="text-sm">Made by <a href="https://github.com/TecHeReTiC3141" target="_blank"
                                                 className="italic hover:underline">TecHeReTiC</a> and
                <a href="https://github.com/arekalov" target="_blank"
                    className="italic hover:underline"> хуй просто</a> with love and
                dedication</p>
        </div>
    )
}

export { Footer }
