function getMainHtml() {
    return `
        <div class="write-notice">
            <input type="text" id="title" placeholder="Title">
            <textarea type="text" id="notice" placeholder="Take a note..."></textarea>
            <button onclick="addNote()">Save</button>
        </div>
        <div id="myposts" class="myposts">
        </div>
        <div class="iconStyleTrash">
            <a href="#" onclick="openTrash()"><i class="fa fa-trash"></i></a>
            <div><a href="#" onclick="hideTrash()">X</a></div>
        </div>
        <div id="trashLike" class="d-none trashStyle">
        </div>
    `;
}

function getTrashHtml(trashTitle, trashNotice, i) {
    return `
        <div class="post">
        <div id="trashTitle${i}" class="postTitle">
        <h5>${trashTitle[i]}</h5>
        </div>
        <textarea id="trashNotice${i}" class="textAreaNewNote">${trashNotice[i]}</textarea>
        <div class="iconField">
            <div class="iconStyle">
                <a href="#" onclick="deleteTrashNote(${i})"><i class="fa fa-trash" style="font-size:30px;color:red"></i></a>
                <a href="#" onclick="recoverTrashNote(${i})"><i class="fa fa-trash" style="font-size:30px;color:green"></i></a>
            </div>
        </div>
        </div>
`;
}

function getNoticeHtml(titles, notices, i) {
    return `
        <div class="post">
        <div class="postTitle">
            <h5>${titles[i]}</h5>
        </div>
        <textarea class="textAreaNewNote">${notices[i]}</textarea>
        <div class="iconField">
            <div class="iconStyle">
                <a href="#" onclick="deleteNote(${i})"><i class="fa fa-trash"></i></a>
            </div>
        </div>
        </div>
`;
}