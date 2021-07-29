import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import MainComponent from "./Components/main.component";
const SocketContext = createContext();

const socket = io.connect("http://localhost:8000");

const ContextProvider = ({ children }) => {
  const [my_id, setMy_id] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false); //
  const [caller, setCaller] = useState(""); //
  const [callerSignal, setCallerSignal] = useState(); //
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState(""); //
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    socket.on("my_id", (id) => {
      setMy_id(id);
    });

    socket.on("callUser", (payload) => {
      setReceivingCall(true);
      setCaller(payload.from);
      setName(payload.name);
      setCallerSignal(payload.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    }); //created new peer object
    peer.on("signal", (payload) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: payload,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (payload) => {
      socket.emit("answerCall", { signal: payload, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };
  return (
    <>
      <SocketContext.Provider
        value={{
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          my_id,
          callUser,
          leaveCall,
          answerCall,
          receivingCall,
          idToCall,
          setIdToCall,
        }}
      >
        <MainComponent />
      </SocketContext.Provider>
    </>
  );
};

export { ContextProvider, SocketContext };
