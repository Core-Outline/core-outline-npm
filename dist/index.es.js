const uuid = require('uuid');
const {
  io: io$2
} = require('socket.io-client');
const socket$2 = io$2('http://localhost:4000');
function streamData$2(data) {
  socket$2.emit('dataEvent', data);
}
const makeRequest = async ({
  url,
  service,
  body,
  params,
  method
}) => {
  const res = await fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
    return json;
  });
  return res;
};
async function getSessionLocation() {
  const res = await makeRequest({
    url: "http://ip-api.com/json",
    method: 'get'
  });
  return res;
}
const startSession = async () => {
  let loc = await getSessionLocation();
  let session = {
    "session_id": uuid.v4(),
    "start_time": Date.now(),
    "end_time": null,
    "device": "getDeviceInfo()"
  };
  session = {
    ...session,
    ...loc
  };
  console.log(session);
  streamData$2({
    "topic": "session-data",
    "data": session
  });
  return session;
};

const {
  io: io$1
} = require('socket.io-client');
const socket$1 = io$1('http://localhost:4000');
function streamData$1(data) {
  socket$1.emit('dataEvent', data);
}
const updatePage = async (session_id, location) => {
  let page = {};
  page = {
    "session_id": session_id,
    "start_date": Date.now(),
    "end_date": null,
    "page_name": location
  };
  streamData$1({
    "topic": "page-data",
    "data": page
  });
  return page;
};

const {
  io
} = require('socket.io-client');
const socket = io('http://localhost:4000');
function streamData(data) {
  socket.emit('dataEvent', data);
}
const targetReached = async session_id => {
  streamData({
    "topic": "target-data",
    "session_id": session_id
  });
};
const registerClick = async (session_id, item_id) => {
  streamData({
    "topic": "click-data",
    "session_id": session_id,
    "item_id": item_id
  });
};

class CoreOutline {
  constructor(access_key, secret_id) {
    this.access_key = access_key;
    this.secret_id = secret_id;
    this.sessionDetails = startSession();
    this.startSession = startSession;
    this.pageDetails = updatePage(this.sessionDetails?.session_id, {});
    this.updatePage = updatePage;
    this.targetReached = targetReached;
    this.registerClick = registerClick;
  }
  endSession() {
    this.sessionDetails.end_time = Date.now();
  }
}

export { CoreOutline };
