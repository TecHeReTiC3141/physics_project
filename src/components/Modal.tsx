import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    id: string
}

function Modal({ id, children }: Props) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-accent text-text font-bold">✕</button>
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
