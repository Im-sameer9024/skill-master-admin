import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

const EditListeningQuestion = ({ id, setShowEditListeningQuestion }) => {
  console.log("id", id);

  const handleCancel = () => {
    setShowEditListeningQuestion(false);
  };

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Listening Question
          </h2>
          <p className="text-sm text-gray-600 mt-1">Edit listening question</p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
          //   disabled={isSubmitting}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default EditListeningQuestion;
