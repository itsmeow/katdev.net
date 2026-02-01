import { FaX } from "react-icons/fa6"
import IconHeader from "./iconHeader"

const Modal = ({ title, children, close }) => {
  return (
    <div className="modal-c-container">
      <div className="modal-c">
        <IconHeader
          text={title}
          icon={
            <button
              onClick={event => {
                close()
                event.preventDefault()
              }}
              onKeyUp={event => {
                if (event.key === "Enter") {
                  close()
                  event.preventDefault()
                }
              }}
              className="modal-c-close"
              aria-label="Close"
            >
              <FaX aria-label="Close" />
            </button>
          }
        />
        <div className="modal-c-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
