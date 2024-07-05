import startSession from "./services/session/start-session";
import updatePage from "./services/page/update-page";
import { targetReached, registerClick } from "./services/target/update-target"
import endSession from "./services/session/end-session";


export class CoreOutline {
    constructor(app_id) {
      this.sessionDetails = startSession(app_id);
      this.startSession = startSession;
      this.endSession = endSession;
      this.pageDetails = updatePage(this.sessionDetails?.session_id, "");
      this.updatePage = updatePage;
      this.targetReached = targetReached;
      this.registerClick = registerClick;
    }   
    endCurrentSession(){
        this.sessionDetails.end_time =new Date(Date.now()).toDateString()
        this.endSession(this.sessionDetails?.session_id, this.sessionDetails.end_time)
    }
    setCurrentPage(page_name, is_terminal=false){
      this.updatePage(this.sessionDetails?.session_id, page_name, is_terminal)
    }
    recordPurchase(){
      this.targetReached(this.sessionDetails?.session_id)
    }
    recordItemClick(item_id){
      this.registerClick(this.sessionDetails?.session_id, item_id)
    }
}
  