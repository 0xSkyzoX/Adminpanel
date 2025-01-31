import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as IconFa from "react-icons/fa";
import LicenseInput from "./Input";
import LicenseButton from "./Button";
import LicenseSelect from "./SelectMenu";
import Box from "@/app/components/dashboard/license/Box";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  updateModuleForm: React.Dispatch<React.SetStateAction<Box>>;
  handleCreate: () => void;
}

const Model: React.FC<ModalProps> = ({
  open,
  setOpen,
  title,
  description,
  updateModuleForm,
  handleCreate,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <IconFa.FaServer
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
                <div className="justify-center mt-10">
                  <LicenseInput
                    id="name"
                    label="Name"
                    required={true}
                    onChange={(e) => {
                      const { value, id } = e.target;
                      updateModuleForm((prev) => ({ ...prev, [id]: value }));
                    }}
                  />
                  <LicenseInput
                    id="description"
                    label="Description"
                    required
                    onChange={(e) => {
                      const { value, id } = e.target;
                      updateModuleForm((prev) => ({ ...prev, [id]: value }));
                    }}
                  />
                  <LicenseSelect updateModuleForm={updateModuleForm}/>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <LicenseButton
                  onClick={() => {
                    handleCreate();
                    setOpen(false);
                  }}
                  fullWidth
                  secondary
                  style="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Create
                </LicenseButton>
                <LicenseButton
                  onClick={() => setOpen(false)}
                  fullWidth
                  danger
                  style="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </LicenseButton>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Model;
