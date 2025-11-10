import TableComponent from "@/components/common/TableComponent";
import { Button } from "@/components/ui/button";
import { MdOutlineVisibility } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import Spinner from "@/components/common/Spinner";
import Popup from "@/components/common/Popup";
import ReactAudioPlayer from "react-audio-player";

// Import your Listening components (you'll need to create these)
import { Link, useParams } from "react-router-dom";
import { ListeningItemAudioColumnsData } from "./Data";
import { useGetSingleListeningItemById } from "../ListeningItems/hooks/useListeningItem";

const ListeningItemsAudios = () => {
  const { listening_item_id } = useParams();

 

  const {
    data: ListeningItemData,
    isLoading,
    error,
  } = useGetSingleListeningItemById(listening_item_id);


  const{VITE_CLIENT_AUDIO_URL} = import.meta.env;

  const audioUrl = `${VITE_CLIENT_AUDIO_URL}`
  console.log("audioURl ",audioUrl);
 

  // Render row function with proper data mapping for Listening
  const renderRow = (audio, index) => (
    <tr key={audio._id || index} className="border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        <Link
          className="hover:underline underline-offset-2 "
          to={`/listening/item/question/${listening_item_id}/${audio._id}`}
        >
          {`${audio.title.slice(0,30)}...`}
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {audio.questions?.length || 0}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-80  ">
       <div>
         <ReactAudioPlayer 
          src={`${audioUrl}/${audio?.audio_file}`} 
          controls 
          className="w-full"
        />
       </div>
        {/* {`${audioUrl}/${audio?.audio_file}`} */}
      </td>

      {/*------------------ actions buttons -------------- */}
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleListeningItem(audio._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <MdOutlineVisibility className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Details</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openEditModal(audio._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <CiEdit className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openDeleteModal(audio._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full hover:text-destructive text-destructive/80 cursor-pointer"
              >
                <MdOutlineDeleteOutline className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </td> */}
    </tr>
  );

  //------------ Loading state ----------------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner />
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg mx-auto">
        <p className="text-red-800 font-semibold mb-2">
          Error loading listening items
        </p>
        <p className="text-red-600 text-sm mb-4">
          {error.response?.data?.message ||
            error.message ||
            "Failed to load listening items"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Listening Items Audio Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Items : {ListeningItemData?.data?.audios?.length || 0}
          </p>
        </div>
        {/* <Button
          onClick={() => setShowCreateListeningItem(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Listening Item
        </Button> */}
      </div>

      {/*----------- popup for Single listening Item----------  */}
      {/* <Popup
        openModal={showSingleListeningItem}
        content={
          <SingleListeningItem
            id={listeningItemId}
            setShowSingleListeningItem={setShowSingleListeningItem}
          />
        }
        width={"w-[70%]"}
      /> */}

      {/*----------- popup for listening Item create----------  */}
      {/* <Popup
        openModal={showCreateListeningItem}
        content={
          <CreateListeningItemForm
            setShowCreateListeningItem={setShowCreateListeningItem}
          />
        }
        width={"w-[70%]"}
      /> */}

      {/*----------- popup for notification status update----------  */}
      {/* <Popup
        openModal={showEditStatusModal}
        content={
          <EditListeningItemStatus
            id={listeningItemId}
            setShowEditStatusModal={setShowEditStatusModal}
          />
        }
        width={"w-[40%]"}
      /> */}

      {/*----------- popup for listening listening delete----------  */}
      {/* <Popup
        openModal={showDeleteModal}
        content={
          <DeleteListeningItem
            id={listeningItemId}
            setShowDeleteModal={setShowDeleteModal}
          />
        }
        width={"w-[40%]"}
      /> */}

      {/*----------- popup for listening listening edit----------  */}
      {/* <Popup
        openModal={showEditListeningItem}
        content={
          <EditListeningItem
            id={listeningItemId}
            setShowEditListeningItem={setShowEditListeningItem}
          />
        }
        width={"w-[70%]"}
      /> */}

      {ListeningItemData?.data?.audios?.length > 0 ? (
        <TableComponent
          columns={ListeningItemAudioColumnsData}
          data={ListeningItemData?.data.audios}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Listening Items Found
            </h3>
            <p className="text-gray-500 mb-4">
              There are no listening items available yet. Create your first
              listening item to get started.
            </p>
            <Button
              // onClick={() => setShowCreateListeningItem(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First Listening Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningItemsAudios;