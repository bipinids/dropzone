import { Container } from "react-bootstrap";
import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import { useEffect, useState } from "react";
import {
  axios,
  INIT_STATE,
  setNotification,
} from "../../globals/helpers/utility";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Batchprocess from "../batchprocess";

export default function App() {
  //global application state in present scenerio
  const [dropzone, updateDropzone] = useState(INIT_STATE);

  useEffect(() => {
    //sidefefects must reside inside useEffect.Linter may kick in
    const uploadProgress = (batchId, progress, data) => {
      dropzone.batch_process.set(batchId, { progress: progress, data: data });
      handleState({ batch_process: dropzone.batch_process });
    };

    if (dropzone.form) {
      const { form } = dropzone;
      const { batch_process_completed } = dropzone;
      //clear form data
      handleState({ form: null });
      //push the batch into stack
      dropzone.batch_process.set(form.get("batch_id"), {
        progress: 0,
        data: form,
      });
      handleState({ batch_process: dropzone.batch_process });
      //set api call using fake axios
      axios(form, uploadProgress).then((batchId) => {
        batch_process_completed.add(batchId);
        handleState({ batch_process_completed: batch_process_completed });
        setNotification("BATCH_PROCESSED", batchId);
      });
    }
  }, [dropzone]);

  const handleState = (stateData) => {
    updateDropzone((prevState) => ({ ...prevState, ...stateData }));
  };
  return (
    <>
      <Batchprocess state={dropzone} />
      <NotificationContainer />
      <Container className="dz-container d-flex flex-column">
        <Header />
        <Main state={dropzone} handleState={handleState} />
        <Footer />
      </Container>
    </>
  );
}
