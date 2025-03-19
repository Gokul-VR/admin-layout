import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
// import DefaultModal from "./components/default-modal";
// import FullScreenModal from "./components/full-screen-modal";
// import AlertModal from "./components/alert-modal";
import Modal from "../../customComponents/modal-components/modal";
import AlertModal from "../../customComponents/modal-components/alertModal";
import Textarea from "../../customComponents/textarea";
import Button from "../../customComponents/button-components/button";
import Input from "../../customComponents/input";

export default function ModalsPage() {
  const [showDefaultModal, setShowDefaultModal] = useState(false);
  const [showCenteredModal, setShowCenteredModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  return (
    <div className="mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-8">Modals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Modal */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Default Modal</h2>
          <Button
            size="large"
            onClick={() => setShowDefaultModal(true)}
            className="bg-[#111010] hover:bg-[#333335] text-white"
          >
            Open Modal
          </Button>

          <Modal
            isOpen={showDefaultModal}
            onClose={() => setShowDefaultModal(false)}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Default Modal</h3>
                <button
                  onClick={() => setShowDefaultModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <p>
                  This is the content of the default modal. You can put any text
                  or components here.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  size="medium"
                  onClick={() => setShowDefaultModal(false)}
                  className="bg-transparent text-gray-700 border border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  size="medium"
                  onClick={() => setShowDefaultModal(false)}
                  className="bg-[#111010] hover:bg-[#333335] text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Form in Modal</h2>
          <Button
            size="large"
            onClick={() => setShowFormModal(true)}
            className="bg-[#111010] hover:bg-[#333335] text-white"
          >
            Open Modal
          </Button>

          <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Form Modal</h3>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="mt-2"
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  size="medium"
                  onClick={() => setShowFormModal(false)}
                  className="bg-transparent text-gray-700 border border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  size="medium"
                  onClick={() => setShowFormModal(false)}
                  className="bg-[#111010] hover:bg-[#333335] text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Full Screen Modal</h2>

          <Button
            size="large"
            onClick={() => setShowFullScreenModal(true)}
            className="bg-[#111010] hover:bg-[#333335] text-white"
          >
            Open Modal
          </Button>

          <Modal
            isOpen={showFullScreenModal}
            onClose={() => setShowFullScreenModal(false)}
            fullScreen
          >
            <div className="flex flex-col h-screen w-screen">
              <div className="flex justify-between items-center p-4 bg-white">
                <h3 className="text-xl font-semibold">Full Screen</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFullScreenModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 p-6 overflow-auto bg-white">
                {" "}
                This is the content of the full screen modal. You can put any
                text or components here.
              </div>
              <div className="flex justify-end space-x-2 p-4  bg-white">
                <Button
                  size="medium"
                  onClick={() => setShowFullScreenModal(false)}
                  className="bg-transparent text-gray-700 border border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  size="medium"
                  onClick={() => setShowFullScreenModal(false)}
                  className="bg-[#111010] hover:bg-[#333335] text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 ">
          <h2 className="text-xl font-semibold mb-6">Modal Based Alerts</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              size="large"
              onClick={() => setShowSuccessAlert(true)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Success Alert
            </Button>
            <Button
              size="large"
              onClick={() => setShowInfoAlert(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Info Alert
            </Button>

            <Button
              size="large"
              onClick={() => setShowWarningAlert(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Warning Alert
            </Button>
            <Button
              size="large"
              onClick={() => setShowDangerAlert(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Danger Alert
            </Button>
          </div>

          <AlertModal
            isOpen={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
            icon={<CheckCircle className="h-12 w-12 text-green-500" />}
            title="Success!"
            content="Your action has been completed successfully. The operation was performed without any issues."
            buttonText="Okay, Got It"
            buttonColor="bg-green-500 hover:bg-green-600"
          />

          <AlertModal
            isOpen={showInfoAlert}
            onClose={() => setShowInfoAlert(false)}
            icon={<Info className="h-12 w-12 text-blue-500" />}
            title="Information"
            content="This is an informational message. Please read it carefully before proceeding."
            buttonText="Okay, Got It"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          />

          <AlertModal
            isOpen={showWarningAlert}
            onClose={() => setShowWarningAlert(false)}
            icon={<AlertTriangle className="h-12 w-12 text-orange-500" />}
            title="Warning Alert!"
            content="Lorem ipsum dolor sit amet consectetur. Feugiat ipsum libero tempor felis risus nisi non. Quisque eu ut tempor curabitur."
            buttonText="Okay, Got It"
            buttonColor="bg-orange-500 hover:bg-orange-600"
          />

          <AlertModal
            isOpen={showDangerAlert}
            onClose={() => setShowDangerAlert(false)}
            icon={<AlertCircle className="h-12 w-12 text-red-500" />}
            title="Danger Alert"
            content="This action cannot be undone. Please confirm that you want to proceed with this potentially destructive action."
            buttonText="Okay, Got It"
            buttonColor="bg-red-500 hover:bg-red-600"
          />
        </div>
      </div>

      {/* Modal Based Alerts */}
      {/* <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 mt-6">
        <h2 className="text-xl font-semibold mb-6">Modal Based Alerts</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            size="large"
            onClick={() => setShowSuccessAlert(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Success Alert
          </Button>
          <Button
            size="large"
            onClick={() => setShowInfoAlert(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Info Alert
          </Button>

          <Button
            size="large"
            onClick={() => setShowWarningAlert(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Warning Alert
          </Button>
          <Button
            size="large"
            onClick={() => setShowDangerAlert(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Danger Alert
          </Button>
        </div>

        <AlertModal
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          icon={<CheckCircle className="h-12 w-12 text-green-500" />}
          title="Success!"
          content="Your action has been completed successfully. The operation was performed without any issues."
          buttonText="Okay, Got It"
          buttonColor="bg-green-500 hover:bg-green-600"
        />

        <AlertModal
          isOpen={showInfoAlert}
          onClose={() => setShowInfoAlert(false)}
          icon={<Info className="h-12 w-12 text-blue-500" />}
          title="Information"
          content="This is an informational message. Please read it carefully before proceeding."
          buttonText="Okay, Got It"
          buttonColor="bg-blue-500 hover:bg-blue-600"
        />

        <AlertModal
          isOpen={showWarningAlert}
          onClose={() => setShowWarningAlert(false)}
          icon={<AlertTriangle className="h-12 w-12 text-orange-500" />}
          title="Warning Alert!"
          content="Lorem ipsum dolor sit amet consectetur. Feugiat ipsum libero tempor felis risus nisi non. Quisque eu ut tempor curabitur."
          buttonText="Okay, Got It"
          buttonColor="bg-orange-500 hover:bg-orange-600"
        />

        <AlertModal
          isOpen={showDangerAlert}
          onClose={() => setShowDangerAlert(false)}
          icon={<AlertCircle className="h-12 w-12 text-red-500" />}
          title="Danger Alert"
          content="This action cannot be undone. Please confirm that you want to proceed with this potentially destructive action."
          buttonText="Okay, Got It"
          buttonColor="bg-red-500 hover:bg-red-600"
        />
      </div> */}
    </div>
  );
}
