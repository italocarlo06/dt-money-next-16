export type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div 
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0 bg-gray-700 opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg">
            <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="font-semibold leading-6 text-title text-xl"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-modal px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                onClick={onConfirm}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
