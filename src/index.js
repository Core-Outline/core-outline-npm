import startSession from "./services/session/start-session";
import updatePage from "./services/page/update-page";
import { targetReached, registerClick } from "./services/target/update-target"

export class CoreOutline {
    constructor(access_key, secret_id) {
      this.access_key = access_key;
      this.secret_id = secret_id;
      this.sessionDetails = startSession();
      this.startSession = startSession;
      this.pageDetails = updatePage(this.sessionDetails?.session_id, "");
      this.updatePage = updatePage;
      this.targetReached = targetReached;
      this.registerClick = registerClick;
    }   
    endSession(){
        this.sessionDetails.end_time = Date.now()
    }
}
  