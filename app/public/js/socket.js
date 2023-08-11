const socket = io('http://localhost:8000');
let nameSpaceSocket;


function stringToHtml(str) {
    const parse = new DOMParser();
    const doc = parse.parseFromString(str, 'text/html');
    return doc.body.firstChild;
};



function initNameSpaceConnection(endpoint) {
    if (nameSpaceSocket) nameSpaceSocket.close();
    nameSpaceSocket = io(`http://localhost:8000/${endpoint}`);
    nameSpaceSocket.on('roomList', roomList => {
        getRoomInfo(roomList[0].name)
        const roomListElement = document.getElementById('rooms');
        roomListElement.innerHTML = ''
        for (const room of roomList) {
            const html = stringToHtml(`
                <div class="row sideBar-body contactElement" roomName="${room.name}">
                        <div class="col-sm-3 col-xs-3 sideBar-avatar">
                            <div class="avatar-icon">
                                <img class="imageRoom" src="${room.imageUrl}">
                            </div>
                        </div>
                        <div class="col-sm-9 col-xs-9 sideBar-main">
                            <div class="row">
                                <div class="col-sm-8 col-xs-8 sideBar-name">
                                    <span class="name-meta">${room.name}</span>
                                </div>
                                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                    <span class="time-meta pull-right">18:18</span>
                                </div>
                            </div>
                        </div>
                    </div>`)
            roomListElement.appendChild(html);
        };

        const roomElements = document.querySelectorAll('.contactElement');
        for (const roomElement of roomElements) {
            roomElement.addEventListener('click', () => {
                const roomName = roomElement.getAttribute('roomName');
                getRoomInfo(roomName);
            });
        };
    });
};

function getRoomInfo(roomName) {
    nameSpaceSocket.emit('joinRoom', roomName);
    nameSpaceSocket.on('roomInfo', roomInfo => {
        document.getElementById('roomNameSingle').innerHTML = roomInfo.name;
    });
    nameSpaceSocket.on('onlineUser', onlineUser => {
        const onlineUserElement = document.getElementById('onlineUserRoom');
        onlineUserElement.innerText = `On:${onlineUser}`
    });

};

window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        sendMessage()
        return
    }
})


let check = false;
socket.on('connect', () => {
    socket.on('nameSpaceList', nameSpaces => {
        const nameSpaceElement = document.getElementById('nameSpace');
        nameSpaceElement.innerHTML = ''
        if (!check) {
            initNameSpaceConnection(nameSpaces[0].endpoint);
            check = true;
        };
        for (const nameSpace of nameSpaces) {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.setAttribute('class', 'pContact');
            p.setAttribute('endpoint', nameSpace.endpoint);
            p.innerText = nameSpace.title;
            li.appendChild(p);
            nameSpaceElement.appendChild(li);
        }

        const roomsElement = document.querySelectorAll('.pContact');

        for (const room of roomsElement) {
            room.addEventListener('click', () => {
                const endpointElement = room.getAttribute('endpoint');
                initNameSpaceConnection(endpointElement);
            });
        };
    });

});


function sendMessage() {
    const inputMessage = document.getElementById('comment').value;
    nameSpaceSocket.emit('message', inputMessage);
    nameSpaceSocket.on('getMessage', data =>{
        console.log(data)
    });
    const conversationElement = document.querySelector('#messageBox ul.ulMessageBox')
    const html = stringToHtml(`
        <li><p>${inputMessage}</p></li>
    `);
    conversationElement.appendChild(html);
    document.getElementById('comment').value = '';
};








// const socket = io('http://localhost:8000');
// let nameSpaceSocket;

// function stringToHtml(string) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(string, 'text/html');
//     return doc.body.firstChild;
// }

// function initNameSpaceConnectoin(endpoint) {
//     if (nameSpaceSocket) nameSpaceSocket.close();
//     nameSpaceSocket = io(`http://localhost:8000/${endpoint}`)
//     nameSpaceSocket.on('roomList', rooms => {
//         getRoomInfo(rooms[0].name);
//         const roomsElement = document.getElementById('contacts');
//         roomsElement.innerHTML = ''
//         for (const room of rooms) {
//             const html = stringToHtml(`
//             <div class="contact"  id="RoomName" roomName="${room.name}">
//                 <div class="boxImageRoom" roomSelector=${room.name}>
//                     <img class="" src="${room.imageUrl}" alt="Image not founed">
//                 </div>

//                 <div class="infoRoom">
//                     <div class="badge">
//                         14
//                     </div>
//                     <div class="name">
//                         ${room.name}
//                     </div>
//                     <div class="message">
//                         ${room.description}
//                     </div>
//                 </div>
//           </div>
//           `);
//             roomsElement.appendChild(html);
//         }

//         const roomNodes = document.querySelectorAll('#RoomName');
//         for (const roomNode of roomNodes) {
//             roomNode.addEventListener('click', () => {
//                 const roomName = roomNode.getAttribute('roomName');
//                 getRoomInfo(roomName);
//             });
//         };

//     });
// };

// function getRoomInfo(name) {
//     nameSpaceSocket.emit('joinRoom', name);
//     nameSpaceSocket.on('roomInfo', data => {
//         if (data) document.querySelectorAll('#nameSeen p.name')[0].innerText = data.name;
//     });
//     nameSpaceSocket.on('onlineUser', onlineUser => {
//         const onlineUserElement = document.getElementById('onlineUser');
//         onlineUserElement.textContent = onlineUser;
//     });
//     window.addEventListener('keydown', (e) => {
//         if (e.code == 'Enter'){
//             return sendMessage();
//         }
//     })

// };

// function sendMessage() {
//     let inputMessage = document.getElementById('inputMessage').value;

//     nameSpaceSocket.emit('newMessage', inputMessage)
//     const li = stringToHtml(`
//         <li class="mMe">
//             <p>
//                ${inputMessage}
//             </p>
//         </li>`
//     );

//     document.querySelector('#chat ul.ulMessage').appendChild(li);
//     inputMessage = document.getElementById('inputMessage').value = '';
//     const messageElement = document.querySelector('#chat');
//     console.log(messageElement.scrollHeight);
//     messageElement.scrollTo(0 , messageElement.scrollHeight);

// };

// let num = true;

// socket.on('connect', () => {
//     socket.on('nameSpaceList', nameSpaceList => {
//         const nameSpaceElement = document.getElementById('nameSpace');
//         nameSpaceElement.innerHTML = '';
//         if (num) {
//             initNameSpaceConnectoin(nameSpaceList[0].endpoint);
//             num = false;
//         };
//         for (const nameSpace of nameSpaceList) {
//             const li = document.createElement('li');
//             const p = document.createElement('p');
//             p.setAttribute('class', 'nameSpaceTitle');
//             p.setAttribute('endpoint', nameSpace.endpoint);
//             p.innerText = nameSpace.title;
//             li.appendChild(p);
//             nameSpaceElement.appendChild(li);
//         }
//         const nameSpaceNodes = document.querySelectorAll('#nameSpace li p.nameSpaceTitle');
//         for (const nameSpaceElement of nameSpaceNodes) {
//             nameSpaceElement.addEventListener('click', (e) => {
//                 const endpoint = nameSpaceElement.getAttribute('endpoint');
//                 initNameSpaceConnectoin(endpoint)
//             })
//         }
//     })

// });



