import { useState } from "react";

import Button from "../../customComponents/button-components/button";
import LoadingButton from "../../customComponents/button-components/loadingButton";
import { Calendar, Clock } from "lucide-react";
export default function ButtonsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <div className="mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-8">Buttons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Sizes</h2>
          <div className="flex flex-wrap gap-3">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Loading Buttons</h2>
          <LoadingButton
            onClick={handleClick}
            size="medium"
            className="bg-[#111010] hover:bg-[#333335] text-white text-sm h-10 w-full md:w-2/3 "
            isLoading={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </LoadingButton>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 mt-6">
        <h2 className="text-xl font-semibold mb-6">Coloured buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            size="large"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Success
          </Button>
          <Button
            size="large"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Info
          </Button>

          <Button
            size="large"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Warning
          </Button>
          <Button
            size="large"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Danger
          </Button>
          <Button disabled size="large">
            Disabled
          </Button>
        </div>
      </div>
    </div>
  );
}
