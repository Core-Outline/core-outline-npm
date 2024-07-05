const uuid = require('uuid');
const {
  io: io$3
} = require('socket.io-client');
const socket$3 = io$3('http://52.35.48.129:4000');
function streamData$3(data) {
  socket$3.emit('dataEvent', data);
}
const makeRequest = async ({
  url,
  service,
  body,
  params,
  method
}) => {
  let res;
  console.log(url);
  console.log(params);
  if (params) {
    res = await fetch(`${url}${params}`).then(function (response) {
      console.log(response);
      return response.json();
    }).then(function (json) {
      console.log(json);
      return json;
    });
  } else {
    res = await fetch(`${url}`).then(function (response) {
      console.log(response);
      return response.json();
    }).then(function (json) {
      console.log(json);
      return json;
    });
  }
  return res;
};
async function getSessionLocation() {
  const res = await makeRequest({
    url: "http://ip-api.com/json",
    method: 'get'
  });
  return res;
}
async function getAppDetails(app_id) {
  const res = await makeRequest({
    url: "http://52.35.48.129:5000/data-source/get-data-source",
    method: 'get',
    params: `?type=saas&app_id=${app_id}`
  });
  return res;
}
const startSession = async app_id => {
  let loc = await getSessionLocation();
  console.log(loc);
  data_source = await getAppDetails(app_id);
  console.log(data_source);
  let session = {
    "topic": "session-data",
    "data_source_id": data_source?.data_source_id,
    "session_id": uuid.v4(),
    "start_date": new Date(Date.now()).toDateString(),
    "latitude": loc?.lat,
    "longitude": loc?.lon,
    "country": loc?.country,
    "region": loc?.regionName,
    "city": loc?.city,
    "device": "getDeviceInfo"
  };
  console.log(session);
  streamData$3(session);
  return session;
};

const {
  io: io$2
} = require('socket.io-client');
const socket$2 = io$2('http://52.35.48.129:4000');
function streamData$2(data) {
  socket$2.emit('dataEvent', data);
}
const updatePage = async (session_id, location, is_terminal = false) => {
  let page = {};
  page = {
    "topic": "page-data",
    "session_id": session_id,
    "start_date": new Date(Date.now()).toDateString(),
    "page_name": location,
    "is_terminal": is_terminal
  };
  streamData$2(page);
  return page;
};

const {
  io: io$1
} = require('socket.io-client');
const socket$1 = io$1('http://52.35.48.129:4000');
function streamData$1(data) {
  socket$1.emit('dataEvent', data);
}
const targetReached = async session_id => {
  streamData$1({
    "topic": "update-session-data",
    "session_id": session_id,
    "click_through": true
  });
};
const registerClick = async (session_id, item_id) => {
  streamData$1({
    "topic": "update-session-data",
    "session_id": session_id,
    "item_clicked": item_id
  });
};

const {
  io
} = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');
function streamData(data) {
  socket.emit('dataEvent', data);
}
const endSession = async (session_id, end_date) => {
  streamData({
    topic: "update-session-data",
    session_id,
    end_date
  });
};

class CoreOutline {
  constructor(app_id) {
    this.sessionDetails = startSession(app_id);
    this.startSession = startSession;
    this.endSession = endSession;
    this.pageDetails = updatePage(this.sessionDetails?.session_id, "");
    this.updatePage = updatePage;
    this.targetReached = targetReached;
    this.registerClick = registerClick;
  }
  endCurrentSession() {
    this.sessionDetails.end_time = new Date(Date.now()).toDateString();
    this.endSession(this.sessionDetails?.session_id, this.sessionDetails.end_time);
  }
  setCurrentPage(page_name, is_terminal = false) {
    this.updatePage(this.sessionDetails?.session_id, page_name, is_terminal);
  }
  recordPurchase() {
    this.targetReached(this.sessionDetails?.session_id);
  }
  recordItemClick(item_id) {
    this.registerClick(this.sessionDetails?.session_id, item_id);
  }
}

export { CoreOutline };
