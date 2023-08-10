const socket = io('http://localhost:8000');



socket.on('connect', () => {
    socket.on('nameSpaceList', nameSpaces => {
        const nameSpaceElement = document.getElementById('nameSpace');
        nameSpaceElement.innerHTML = ''
        for (const nameSpace of nameSpaces) {
            const li = document.createElement('li');
            const  p = document.createElement('p');
            p.innerText = nameSpace.title;
            li.appendChild(p);
            nameSpaceElement.appendChild(li);
        }
    });
});








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



