// 미리 정의된 컴퓨터 데이터베이스
const computerDatabase = {
    "MacBook Pro": { cpu: "2.3 GHz 8-core Intel Core i9", ram: "16 GB", storage: "1 TB SSD", gpu: "AMD Radeon Pro 5500M", model: "MacBook Pro 16-inch", manufacturer: "Apple" },
    "Dell XPS 13": { cpu: "1.8 GHz quad-core Intel Core i7", ram: "16 GB", storage: "512 GB SSD", gpu: "Intel UHD Graphics", model: "XPS 13 7390", manufacturer: "Dell" },
    "HP Spectre x360": { cpu: "1.3 GHz quad-core Intel Core i7", ram: "16 GB", storage: "512 GB SSD", gpu: "Intel Iris Plus Graphics", model: "Spectre x360 13-aw2000", manufacturer: "HP" },
    "Lenovo ThinkPad X1 Carbon": { cpu: "1.9 GHz quad-core Intel Core i7", ram: "16 GB", storage: "1 TB SSD", gpu: "Intel UHD Graphics", model: "ThinkPad X1 Carbon Gen 8", manufacturer: "Lenovo" },
    "Asus ZenBook 14": { cpu: "1.6 GHz quad-core Intel Core i5", ram: "8 GB", storage: "256 GB SSD", gpu: "NVIDIA GeForce MX250", model: "ZenBook 14 UX433FA", manufacturer: "Asus" }
};
const imagePaths = {
    "MacBook Pro": "image/macbook.jpg",
    "Dell XPS 13": "image/dellxps13.jpg",
    "HP Spectre x360": "image/HP Spectre x360.jpg",
    "Lenovo ThinkPad X1 Carbon": "image/Lenovo ThinkPad X1 Carbon.jpg",
    "Asus ZenBook 14": "image/Asus ZenBook 14.jpg"
    // 다른 컴퓨터 이미지 경로를 여기에 추가할 수 있습니다.
};

function showSuggestions(input, suggestionBoxId, showAll = false) {
    const suggestionBox = document.getElementById(suggestionBoxId);
    suggestionBox.innerHTML = ''; // 기존목록 초기화

    let suggestions = Object.keys(computerDatabase);

    // showAll이 false이고 사용자 입력이 있는 경우, 필터링 적용
    if (!showAll && input.value.length > 0) {
        const query = input.value.toLowerCase();
        suggestions = suggestions.filter(name => name.toLowerCase().includes(query));
    }

    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion;
        suggestionDiv.classList.add('autocomplete-suggestion');
        suggestionDiv.onclick = () => {
            input.value = suggestion;
            suggestionBox.innerHTML = ''; // 선택했으면 목록 초기화
        };
        suggestionBox.appendChild(suggestionDiv);
    });
}

function compareComputers() {
    const computer1Name = document.getElementById('computer1').value;
    const computer2Name = document.getElementById('computer2').value;

    if (!computerDatabase[computer1Name] || !computerDatabase[computer2Name]) {
        alert("유효한 컴퓨터 이름을 입력하세요.");
        return;
    }

    const computer1 = computerDatabase[computer1Name];
    const computer2 = computerDatabase[computer2Name];

    displayComparisonResult(computer1Name, computer1, computer2Name, computer2);
    displayImages(computer1Name, computer2Name);
}

function displayComparisonResult(name1, specs1, name2, specs2) {
    const comparisonResultsDiv = document.getElementById('comparison-results');
    comparisonResultsDiv.innerHTML = ''; // 이전 결과 지우기

    const resultTitle = document.createElement('p');
    resultTitle.classList.add('result-title');
    resultTitle.textContent = '비교 결과';
    comparisonResultsDiv.appendChild(resultTitle);

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = '스펙';
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = name1;
    const headerCell3 = document.createElement('th');
    headerCell3.textContent = name2;
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    headerRow.appendChild(headerCell3);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    const modelRow = document.createElement('tr');
    const modelCell1 = document.createElement('td');
    modelCell1.textContent = '모델명';
    const modelCell2 = document.createElement('td');
    modelCell2.textContent = specs1.model;
    const modelCell3 = document.createElement('td');
    modelCell3.textContent = specs2.model;
    modelRow.appendChild(modelCell1);
    modelRow.appendChild(modelCell2);
    modelRow.appendChild(modelCell3);
    tbody.appendChild(modelRow);

    const manufacturerRow = document.createElement('tr');
    const manufacturerCell1 = document.createElement('td');
    manufacturerCell1.textContent = '제조사';
    const manufacturerCell2 = document.createElement('td');
    manufacturerCell2.textContent = specs1.manufacturer;
    const manufacturerCell3 = document.createElement('td');
    manufacturerCell3.textContent = specs2.manufacturer;
    manufacturerRow.appendChild(manufacturerCell1);
    manufacturerRow.appendChild(manufacturerCell2);
    manufacturerRow.appendChild(manufacturerCell3);
    tbody.appendChild(manufacturerRow);

    const cpuRow = document.createElement('tr');
    const cpuCell1 = document.createElement('td');
    cpuCell1.textContent = 'CPU';
    const cpuCell2 = document.createElement('td');
    cpuCell2.textContent = specs1.cpu;
    const cpuCell3 = document.createElement('td');
    cpuCell3.textContent = specs2.cpu;
    cpuRow.appendChild(cpuCell1);
    cpuRow.appendChild(cpuCell2);
    cpuRow.appendChild(cpuCell3);
    tbody.appendChild(cpuRow);

    const ramRow = document.createElement('tr');
    const ramCell1 = document.createElement('td');
    ramCell1.textContent = 'RAM';
    const ramCell2 = document.createElement('td');
    ramCell2.textContent = specs1.ram;
    const ramCell3 = document.createElement('td');
    ramCell3.textContent = specs2.ram;
    ramRow.appendChild(ramCell1);
    ramRow.appendChild(ramCell2);
    ramRow.appendChild(ramCell3);
    tbody.appendChild(ramRow);

    const gpuRow = document.createElement('tr');
    const gpuCell1 = document.createElement('td');
    gpuCell1.textContent = '그래픽 카드';
    const gpuCell2 = document.createElement('td');
    gpuCell2.textContent = specs1.gpu;
    const gpuCell3 = document.createElement('td');
    gpuCell3.textContent = specs2.gpu;
    gpuRow.appendChild(gpuCell1);
    gpuRow.appendChild(gpuCell2);
    gpuRow.appendChild(gpuCell3);
    tbody.appendChild(gpuRow);

    const storageRow = document.createElement('tr');
    const storageCell1 = document.createElement('td');
    storageCell1.textContent = '저장 용량';
    const storageCell2 = document.createElement('td');
    storageCell2.textContent = specs1.storage;
    const storageCell3 = document.createElement('td');
    storageCell3.textContent = specs2.storage;
    storageRow.appendChild(storageCell1);
    storageRow.appendChild(storageCell2);
    storageRow.appendChild(storageCell3);
    tbody.appendChild(storageRow);

    table.appendChild(tbody);
    comparisonResultsDiv.appendChild(table);
}

function displayImages(computer1Name, computer2Name) {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    if (imagePaths[computer1Name]) {
        image1.src = imagePaths[computer1Name];
        image1.style.display = 'block';
    } else {
        image1.style.display = 'none';
    }

    if (imagePaths[computer2Name]) {
        image2.src = imagePaths[computer2Name];
        image2.style.display = 'block';
    } else {
        image2.style.display = 'none';
    }
}

function submitComment() {
    const commentText = document.getElementById('comment-text').value;
    if (commentText.trim() === '') {
        alert('댓글을 입력하세요.');
        return;
    }

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');

    const commentParagraph = document.createElement('p');
    commentParagraph.textContent = commentText;

    const commentTime = document.createElement('div');
    commentTime.classList.add('comment-time');
    const currentDateTime = new Date().toLocaleString();
    commentTime.textContent = currentDateTime;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => deleteComment(commentContainer);

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.textContent = '추천';
    likeButton.onclick = () => toggleLike(likeButton);

    const likeCount = document.createElement('span');
    likeCount.classList.add('like-count');
    likeCount.textContent = '0';

    likeButton.appendChild(likeCount);

    const replySection = document.createElement('div');
    replySection.classList.add('reply-section');

    const replyTextarea = document.createElement('textarea');
    replyTextarea.setAttribute('rows', '2');
    replyTextarea.setAttribute('placeholder', '댓글을 작성하세요...');

    const replyButton = document.createElement('button');
    replyButton.classList.add('reply-button');
    replyButton.textContent = '댓글 달기';
    replyButton.onclick = () => submitReply(replyTextarea, commentContainer);

    replySection.appendChild(replyTextarea);
    replySection.appendChild(replyButton);

    commentContainer.appendChild(commentParagraph);
    commentContainer.appendChild(commentTime);
    commentContainer.appendChild(deleteButton);
    commentContainer.appendChild(likeButton);
    commentContainer.appendChild(replySection);

    document.getElementById('comments-container').appendChild(commentContainer);

    // Clear the textarea
    document.getElementById('comment-text').value = '';
}

function submitReply(replyTextarea, commentContainer) {
    const replyText = replyTextarea.value;
    if (replyText.trim() === '') {
        alert('댓글을 입력하세요.');
        return;
    }

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('comment');

    const replyParagraph = document.createElement('p');
    replyParagraph.textContent = replyText;

    const replyTime = document.createElement('div');
    replyTime.classList.add('comment-time');
    const currentDateTime = new Date().toLocaleString();
    replyTime.textContent = currentDateTime;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => deleteComment(replyContainer);

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.textContent = '추천';
    likeButton.onclick = () => toggleLike(likeButton);

    const likeCount = document.createElement('span');
    likeCount.classList.add('like-count');
    likeCount.textContent = '0';

    likeButton.appendChild(likeCount);

    replyContainer.appendChild(replyParagraph);
    replyContainer.appendChild(replyTime);
    replyContainer.appendChild(deleteButton);
    replyContainer.appendChild(likeButton);

    commentContainer.appendChild(replyContainer);

    // Clear the reply textarea
    replyTextarea.value = '';
}

function deleteComment(commentContainer) {
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        commentContainer.remove();
    }
}

function toggleLike(likeButton) {
    const likeCount = likeButton.querySelector('.like-count');
    let count = parseInt(likeCount.textContent, 10);
    if (likeButton.classList.contains('liked')) {
        count -= 1;
        likeButton.classList.remove('liked');
    } else {
        count += 1;
        likeButton.classList.add('liked');
    }
    likeCount.textContent = count;
}
