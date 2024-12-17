import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    id: string
}

function Modal({ id, children }: Props) {
    return (
        <dialog id={id} className="modal ">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-8 top-5 bg-primary hover:bg-accent hover:text-background text-text font-bold">✕
                    </button>
                </form>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export { Modal }
