document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출을 막습니다.
    addComment();
});

function addComment() {
    const commentContent = document.getElementById('new-comment').value;

    if (commentContent.trim() === '') {
        alert('댓글을 입력해주세요.');
        return;
    }

    const commentList = document.getElementById('comment-list');

    // 현재 날짜와 시간을 가져오기
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}`;
    const daysAgo = Math.floor((new Date() - now) / (1000 * 60 * 60 * 24));

    const newComment = document.createElement('li');
    newComment.classList.add('flex', 'flex-col', 'gap-2');
    newComment.innerHTML = `
        <div class="flex justify-between items-end">
            <div class="flex gap-2 items-end">
                <div class="flex gap-1 items-center text-sm">
                    <div id="gradeBadge" class="color user" style="background-color: blue">U</div>
                    <div class="user-name">사용자</div>
                </div>
            </div>
        </div>
        <div>${commentContent}</div>
        <div class="flex gap-3">
            <div class="text-gray-400 text-xs">${daysAgo} 일전 ${formattedDate}</div>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="showReplyForm(this)">답글</a>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="likeComment(this)" data-liked="false">추천 (0)</a>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="deleteComment(this)">삭제</a>
        </div>
        <div class="reply-form hidden">
            <textarea class="border border-solid border-gray-100 w-full p-3" placeholder="답글을 작성하세요"></textarea>
            <button class="w-24 bg-[#f8f9fc]" onclick="addReply(this)">답글</button>
        </div>
        <div class="relative w-0 h-0" style="display: none;">
            <div class="flex flex-col w-48 absolute order-last bg-white shadow-xl rounded">
                <a href="/note/write?receiverUserId=1" class="p-3 hover:bg-gray-100 transition">
                    <i class="bi bi-send"></i>
                    쪽지 보내기
                </a>
            </div>
        </div>
    `;

    newComment.querySelector('.user-name').addEventListener('click', function() {
        toggleMessagePopup(this);
    });

    commentList.prepend(newComment); // 새로운 댓글을 리스트의 맨 위에 추가합니다.

    document.getElementById('new-comment').value = ''; // 입력 필드를 비웁니다.
}

function likeComment(element) {
    if (element.getAttribute('data-liked') === 'true') {
        alert('한번만 가능합니다');
        return;
    }

    const likeText = element.innerText;
    const likeCount = parseInt(likeText.match(/\d+/)[0]);
    element.innerText = `추천 (${likeCount + 1})`;
    element.setAttribute('data-liked', 'true');
}

function showReplyForm(element) {
    const replyForm = element.closest('li').querySelector('.reply-form');
    replyForm.classList.toggle('hidden');
}

function addReply(button) {
    const replyContent = button.previousElementSibling.value;

    if (replyContent.trim() === '') {
        alert('답글을 입력해주세요.');
        return;
    }

    const replyList = button.closest('li').querySelector('.reply-list');
    if (!replyList) {
        const newReplyList = document.createElement('ul');
        newReplyList.classList.add('reply-list', 'ml-8', 'mt-2');
        button.closest('li').appendChild(newReplyList);
    }

    const newReply = document.createElement('li');
    newReply.classList.add('flex', 'flex-col', 'gap-2');
    newReply.innerHTML = `
        <div class="flex justify-between items-end">
            <div class="flex gap-2 items-end">
                <div class="flex gap-1 items-center text-sm">
                    <div id="gradeBadge" class="color user" style="background-color: blue">U</div>
                    <div class="user-name">사용자</div>
                </div>
            </div>
        </div>
        <div>${replyContent}</div>
        <div class="flex gap-3">
            <div class="text-gray-400 text-xs">0 일전 ${new Date().getFullYear()}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}</div>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="showReplyForm(this)">답글</a>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="likeComment(this)" data-liked="false">추천 (0)</a>
            <a href="javascript:;" class="text-gray-400 text-xs" onclick="deleteComment(this)">삭제</a>
        </div>
        <div class="reply-form hidden">
            <textarea class="border border-solid border-gray-100 w-full p-3" placeholder="답글을 작성하세요"></textarea>
            <button class="w-24 bg-[#f8f9fc]" onclick="addReply(this)">답글</button>
        </div>
        <div class="relative w-0 h-0" style="display: none;">
            <div class="flex flex-col w-48 absolute order-last bg-white shadow-xl rounded">
                <a href="/note/write?receiverUserId=1" class="p-3 hover:bg-gray-100 transition">
                    <i class="bi bi-send"></i>
                    쪽지 보내기
                </a>
            </div>
        </div>
    `;

    replyList.prepend(newReply); // 새로운 답글을 리스트의 맨 위에 추가합니다.

    button.previousElementSibling.value = ''; // 입력 필드를 비웁니다.
}

function deleteComment(element) {
    const comment = element.closest('li');
    comment.remove();
}

function toggleMessagePopup(element) {
    const popup = element.closest('li').querySelector('.relative');
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', function(event) {
    const popups = document.querySelectorAll('.relative');
    popups.forEach(popup => {
        if (!popup.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
});
