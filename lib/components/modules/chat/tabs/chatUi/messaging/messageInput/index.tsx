import React, { FC, useState } from "react";
import TextAreaInput from "./textInput";
import useAuth from "@/lib/hooks/authUser";
import useDialog from "@/lib/hooks/useDialog";
import PreviewModal from "./modals/previewModal";
import { RiAttachment2 } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { BiSolidImageAdd } from "react-icons/bi";

interface Props {
  socket: any;
  item: any;
  followPrivate: () => void;
  response: any;
}
const MessagingInput: FC<Props> = ({
  socket,
  item,
  followPrivate,
  response,
}) => {
  const [message, setMessage] = useState("");
  const [fileMessage, setFileMessage] = useState(false);
  const [sendFile, setSendFile] = useState<any>();
  const { Dialog, setShowModal } = useDialog();
  const [inputImage, setInputImage] = useState<any>();
  const [showAttach, setShowAttach] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { userId: id } = useAuth();

  const handleFileInput = (e: any) => {
    e.preventDefault();
    setShowModal(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setInputImage(selectedFile);
      setSelectedImage(imageUrl);
      covertFile(selectedFile);
      setShowAttach(false);
    }
  };
  const handleFileInput2 = (e: any) => {
    e.preventDefault();
    setShowModal(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setInputImage(selectedFile);
      setSelectedImage(imageUrl);
      covertFile(selectedFile);
      setShowAttach(false);
    }
    setFileMessage(true)
  };
  const sendMessage = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (message !== "") {
      if (item.userId) {
        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${message}`,
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${message}`,
        });
        followPrivate();
      }
    }
    setMessage("");
  };
  const sendFiles = (val: string) => {
    if (sendFile) {
      if (item.userId) {
        console.log({
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });

        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });
        followPrivate();
      }
    }
    setShowModal(false);
  };
  const covertFile = (item: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = () => {
      const base64 = reader.result;
      setSendFile(base64);
    };
  };
  const ProceedToUpload = async (item: string) => {
    sendFiles(item);
  };
  const ReplyMessage = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (message !== "") {
      if (item.access) {
        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${message}`,
          replyTo: response?.id,
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${message}`,
          replyTo: response?.id,
        });
        followPrivate();
      }
    }
    setMessage("");
  };
  return (
    <div>
      <div className="border border-gray-600 bg-white flex gap-x-2 p-2 items-center rounded-lg">
        <TextAreaInput
          sendMessage={sendMessage}
          replyMessage={ReplyMessage}
          response={response}
          message={message}
          setMessage={setMessage}
        />
        <div className="relative">
          {showAttach && (
              <div className="absolute -top-[108px] -left-[125px] bg-white p-6 w-40 rounded-xl shadow-lg">
                <div>
                  <p className="relative flex gap-x-1 cursor-pointer hover:text-gray-600 items-center text-black fw-500">
                    <BiSolidImageAdd className="text-2xl" />
                    Image
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute w-full h-full z-10 opacity-0"
                      onChange={handleFileInput}
                    />
                  </p>
                  <p className="relative text-orange-800 cursor-pointer flex mt-2 gap-x-1 items-center text-black fw-500">
                    <AiOutlineFileText className="text-2xl" />
                    File
                    <input
                      type="file"
                      // accept="image/*"
                      className="absolute w-full h-full z-10 opacity-0"
                      onChange={handleFileInput2}
                    />
                  </p>
                </div>
              </div>
            )}
          <RiAttachment2
            className="text-2xl text-primary"
            onClick={() => setShowAttach(!showAttach)}
          />
        </div>
      </div>
      <Dialog title="Selected File">
        <PreviewModal
          image={selectedImage}
          proceed={ProceedToUpload}
          close={() => setShowModal(false)}
          file={fileMessage}
        />
      </Dialog>
    </div>
  );
};

export default MessagingInput;
