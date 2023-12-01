import axios from "axios";

let currUser = {};

//FIXME: Currently a hardcoded IP address, needs to be... not that.
//Order of functions:
//0: Create new user, or append an email to get user info
//1: Update current user data
//2: Upload a file (should not be here)
//3: Return array of file names, or append a file name to display that image
/*let URIs = [
   "https://hiroad2022.herokuapp.com/api/user",
   "https://hiroad2022.herokuapp.com/api/user/:id",
   "https://hiroad2022.herokuapp.com/api/upload",
   "https://hiroad2022.herokuapp.com/api/fileinfo",
 ];*/

 let URIs = [
   "http://10.0.0.216:3000/api/user",
   "http://10.0.0.216:3000/api/userupdate/:id",
   "http://10.0.0.216:3000/api/upload",
   "http://10.0.0.216:3000/api/fileinfo",
   "http://10.0.0.216:3000/api/addfriend",
   "http://10.0.0.216:3000/api/exportmap",
   "http://10.0.0.216:3000/api/exportpin",
   "http://10.0.0.216:3000/api/acceptpin"
 ];

//Pushes the current currUser object to the database. Overwrites the existing data with the data in this object.
async function updateUserInfo(email = currUser.email) {
  await axios.post(URIs[1], { email: email, currUser: currUser });
}

async function addFriend(name, phone, friendPhone) {
  await axios.post(URIs[4], { user_name: name, user_phone: phone, friend_phone: friendPhone });
}

async function exportMap(name, index, friendPhone) {
  await axios.post(URIs[5], {user_name: name, map: currUser.maps[index], friend_phone: friendPhone });
}

async function exportPin(name, mapIndex, index, msg, friendPhone) {
  await axios.post(URIs[6], {user_name: name, pin: currUser.maps[mapIndex].pins[index], secret_message: msg, friend_phone: friendPhone });
}

async function acceptPin(email, index) {
  await axios.post(URIs[7], {email: email, pin: currUser.tempObjects.tempPins[index]});
}

//Sets the currUser object to the passed in data. Used for putting the user's data in currUser, called when logging in
function updateCurrUser(object) {
  currUser = object;
}

//Function called when logging in. Generates the get request from the email and password, returns the user object.
const getUser = async (email, password) => {
  const userURI = URIs[0] + "/" + email + "/" + password;
  const userData = {
    email: email,
    password: password,
  };
  const user = await axios.get(userURI, userData);
  const returnData = user.data;
  return returnData;
};

const getUserResetPassword = async (email) => {
  const userURI = URIs[0] + "/" + email;
  const userData = {
    email: email,
  };
  const user = await axios.get(userURI, userData);
  const returnData = user.data;
  return returnData;
};

const postUserResetPassword = async (email) => {
  const userURI = URIs[0] + "/" + email;
  const userData = {
    currUser: currUser
  };
  const user = await axios.post(userURI, userData);
  const returnData = user.data;
  return returnData;
};

function changeUsername(object) {
  currUser.name = object;
}

function changeEmail(object) {
  currUser.email = object;
}

function changePhone(object) {
  currUser.phone = object;
}

function changeFullName(object) {
  currUser.fullName = object;
}

function changePassword(object) {
  currUser.password = object;
}

//Pushes a new pin to a specified map in currUser
function addPin(mapID, object) {
  currUser.maps[mapID].pins.push(object);
}

//Pushes a new pin to a social map in currUser
function addSocialPin(object) {
  currUser.socialMap.pins.push(object);
}

function deleteSocialPin(index) {
  currUser.socialMap.pins.splice(index, 1);
}

//Deletes a pin from a specified map in currUser
function deletePin(mapID, index) {
  currUser.maps[mapID].pins.splice(index, 1);
}

function deletePinSocial(index) {
  currUser.socialMap.pins.splice(index, 1);
}

function deleteFriendRequest(index) {
  currUser.tempObjects.friendRequests.splice(index, 1);
}

function deleteFriend(index) {
  currUser.friendsList.splice(index, 1);
}

function deletePinRequest(index) {
  currUser.tempObjects.tempPins.splice(index, 1);
}

function acceptFriendRequest(index) {
  console.log(currUser);
  let tempRequest = currUser.tempObjects.friendRequests[index];

  let acceptedRequest = {
    "name": tempRequest["name"],
    "phone": tempRequest["phone"],
  };

  console.log(acceptedRequest);

  currUser.friendsList.push(acceptedRequest);
  console.log(currUser);
}

function deleteMapRequest(index) {
  currUser.tempObjects.tempMaps.splice(index, 1);
}

function acceptMapRequest(index) {
  console.log(currUser);
  let tempRequest = currUser.tempObjects.tempMaps[index];

  currUser.maps.push(tempRequest);
  console.log(currUser);
}

//Pushes a new route to a specified map in currUser
function addRoute(mapID, object) {
  if (currUser.maps[mapID].routes == undefined) {
    currUser.maps[mapID].routes = [];
  }
  currUser.maps[mapID].routes.push(object);
}

function addSocialRoute(object) {
  if (currUser.socialMap.routes == undefined) {
    currUser.socialMap.routes = [];
  }
  currUser.socialMap.routes.push(object);
}

//Deletes a route from a specified map in currUser
function deleteRoute(mapID, index) {
  currUser.maps[mapID].routes.splice(index, 1);
}

function deleteSocialRoute(index) {
  currUser.socialMap.routes.splice(index, 1);
}

//Pushes a new map to currUser
function addMap(object) {
  currUser.maps.push(object);
}

//Deletes a map from currUser
function deleteMap(index) {
  currUser.maps.splice(index, 1);
}

//Changes the label of a specified pin in a specified map (in currUser)
function changeTitle(object, mapID, index) {
  currUser.maps[mapID].pins[index].label = object;
}

//Changes the augmented reality flag of a specified pin in a specified map (in currUser)
function changeArFlag(object, mapID, index) {
  currUser.maps[mapID].pins[index].arEnabled = object;
}

//Changes the what3words address of a specified pin in a specified map (in currUser)
function changeW3wAddress(object, mapID, index) {
  currUser.maps[mapID].pins[index].w3wAddress = object;
}

//Changes the notes of a specified pin in a specified map (in currUser)
function changeDesc(object, mapID, index) {
  currUser.maps[mapID].pins[index].comments = object;
}

//Changes the date of a specified pin in a specified map (in currUser)
function changeDate(object, mapID, index) {
  currUser.maps[mapID].pins[index].date = object;
}

//Changes the icon of a specified pin in a specified map (in currUser)
function changeIcon(object, mapID, index) {
  currUser.maps[mapID].pins[index].icon = object;
}

//Changes the name of a specified map in currUser
function changeName(object, index) {
  currUser.maps[index].mapName = object;
}

//Changes the initial region latitude of a specified map in currUser
function changeLat(object, index) {
  currUser.maps[index].startlat = object;
}

//Changes the initial region longitude of a specified map in currUser
function changeLong(object, index) {
  currUser.maps[index].startlng = object;
}

//Changes the address text of a specified map in currUser
function changeAddress(object, index) {
  currUser.maps[index].address = object;
}

//Changes the latitude of a specified pin in a specified map (in currUser)
function changePinLat(object, mapID, index) {
  currUser.maps[mapID].pins[index].lat = object;
}

//Changes the longitude of a specified pin in a specified map (in currUser)
function changePinLng(object, mapID, index) {
  currUser.maps[mapID].pins[index].lng = object;
}

function changePinLatSocial(object, index) {
  currUser.socialMap.pins[index].lat = object;
}

function changePinLngSocial(object, index) {
  currUser.socialMap.pins[index].lng = object;
}

//Changes the color of a specified route in a specified map (in currUser)
function changeColor(object, mapID, index) {
  currUser.maps[mapID].routes[index].color = object;
}

//Changes the label of a specified route in a specified map (in currUser)
function changeRouteTitle(object, mapID, index) {
  currUser.maps[mapID].routes[index].label = object;
}

//Changes the date of a specified route in a specified map (in currUser)
function changeRouteDate(object, mapID, index) {
  currUser.maps[mapID].routes[index].date = object;
}

function changeColorSocial(object, index) {
  currUser.socialMap.routes[index].color = object;
}

function changeRouteTitleSocial(object, index) {
  currUser.socialMap.routes[index].label = object;
}

function changeRouteDateSocial(object, index) {
  currUser.socialMap.routes[index].date = object;
}

function changeTitleSocial(object, index) {
  currUser.socialMap.pins[index].label = object;
}

function changeArFlagSocial(object, index) {
  currUser.socialMap.pins[index].arEnabled = object;
}

function changeW3wAddressSocial(object, index) {
  currUser.socialMap.pins[index].w3wAddress = object;
}

function changeDescSocial(object, index) {
  currUser.socialMap.pins[index].comments = object;
}

function changeDateSocial(object, index) {
  currUser.socialMap.pins[index].date = object;
}

function changeIconSocial(object, index) {
  currUser.socialMap.pins[index].icon = object;
}

function changeNameSocial(object) {
  currUser.socialMap.mapName = object;
}

function changeLatSocial(object) {
  currUser.socialMap.startlat = object;
}

function changeLongSocial(object) {
  currUser.socialMap.startlng = object;
}

function changeAddressSocial(object) {
  currUser.socialMap.address = object;
}

export { addPin };
export { changeFullName };
export { changePhone };
export { deletePin };
export { deletePinSocial };
export { deletePinRequest };
export { addRoute };
export { deleteRoute };
export { deleteMap };
export { addMap };
export { changeTitle };
export { changeDesc };
export { changeArFlag };
export { changeW3wAddress };
export { changeDate };
export { changeIcon };
export { changeName };
export { changeLat };
export { changeLong };
export { changeAddress };
export { changePinLat };
export { changePinLng };
export { changeColor };
export { changeRouteTitle };
export { changeRouteDate };
export { URIs };
export { updateUserInfo };
export { currUser };
export { getUser };
export { changeUsername };
export { changeEmail };
export { changePassword };
export { updateCurrUser };
export { getUserResetPassword };
export { postUserResetPassword };
export { addFriend };
export { acceptFriendRequest };
export { deleteFriendRequest };
export { deleteFriend };
export { exportMap };
export { deleteMapRequest };
export { acceptMapRequest };
export { exportPin };
export { acceptPin };
export { addSocialPin };
export { deleteSocialPin };
export { addSocialRoute };
export { deleteSocialRoute };
export { changePinLatSocial };
export { changePinLngSocial };
export { changeColorSocial };
export { changeRouteTitleSocial};
export { changeRouteDateSocial };
export { changeTitleSocial };
export { changeDescSocial };
export { changeArFlagSocial };
export { changeW3wAddressSocial };
export { changeDateSocial };
export { changeIconSocial };
export { changeNameSocial };
export { changeLatSocial };
export { changeLongSocial };
export { changeAddressSocial };