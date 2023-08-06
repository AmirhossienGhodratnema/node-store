const socket = io('http://localhost:8000');

function stringToHtml(string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');
    return doc.body.firstChild;
}

function initNameSpaceConnectoin(endpoint) {
    const nameSpaceSocket = io(`http://localhost:8000/${endpoint}`)


    nameSpaceSocket.on('roomList', rooms => {
        const roomsElement = document.getElementById('contacts');
        console.log(rooms)
        roomsElement.innerHTML = ''
        for (const room of rooms) {

            // <img class="pic rogers"  src   />

            const html = stringToHtml(`
            <div class="contact">
                <div class="boxImageRoom">
                    <img class=""pic rogers src="${room.imageUrl}" alt="Image not founed">
                </div>

                <div class="infoRoom">
                    <div class="badge">
                        14
                    </div>
                    <div class="name">
                        ${room.name}
                    </div>
                    <div class="message">
                        ${room.description}
                    </div>
                </div>
          </div>
          `);

            roomsElement.appendChild(html)
        }
    });
};


socket.on('connect', () => {
    socket.on('nameSpaceList', nameSpaceList => {

        const nameSpaceElement = document.getElementById('nameSpace');
        nameSpaceElement.innerText = '';
        initNameSpaceConnectoin(nameSpaceList[0].endpoint)
        for (const nameSpace of nameSpaceList) {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.setAttribute('class', 'nameSpaceTitle');
            p.setAttribute('endpoint', nameSpace.endpoint);
            p.innerText = nameSpace.title;
            li.appendChild(p);
            nameSpaceElement.appendChild(li);
        }
        const nameSpaceNodes = document.querySelectorAll('#nameSpace li p.nameSpaceTitle');
        for (const nameSpaceElement of nameSpaceNodes) {
            nameSpaceElement.addEventListener('click', (e) => {
                const endpoint = nameSpaceElement.getAttribute('endpoint');
                initNameSpaceConnectoin(endpoint)
            })
        }
    })

})