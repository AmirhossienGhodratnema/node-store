
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
        getRoomInfo(endpoint, roomList[0].name)
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
                getRoomInfo(endpoint, roomName);
            });
        };
    });
};

function getRoomInfo(endpoint, roomName) {
    console.log('endpoint', endpoint)
    nameSpaceSocket.emit('joinRoom', roomName);
    nameSpaceSocket.on('roomInfo', roomInfo => {
        document.getElementById('roomNameSingle').innerHTML = roomInfo.name;
        document.getElementById('roomNameSingle').setAttribute('roomName', roomName);
        document.getElementById('roomNameSingle').setAttribute('endpoint', endpoint);
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
const btnSendMessage = document.getElementById('btnSendMessage');
btnSendMessage.addEventListener('click', () => {
    sendMessage()
    return;
});


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
    const message = document.getElementById('comment').value;
    const roomName = document.getElementById('roomNameSingle').getAttribute('roomName');
    const endpoint = document.getElementById('roomNameSingle').getAttribute('endpoint');

    if (message.trim() == '') return alert('Message is empty');
    const sender = document.getElementById('userId').value;
    nameSpaceSocket.emit('newMessage', {
        message,
        roomName,
        endpoint,
        sender
    });
    const conversationElement = document.querySelector('#messageBox ul.ulMessageBox');
    nameSpaceSocket.off('getMessage')
    nameSpaceSocket.on('getMessage', data => {
        const html = stringToHtml(`
            <li class="${sender == data.sender ? '' : 'other'}"><p>${data.message}</p></li>
        `);
        conversationElement.appendChild(html);
        document.getElementById('comment').value = '';
        document.querySelector('#messageBox').scrollTo(0, conversationElement.scrollHeight);
    });
};