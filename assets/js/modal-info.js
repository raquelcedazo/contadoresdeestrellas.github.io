const modal = document.getElementById('videoInfo');
const overlay = document.getElementById('overlay');

function moreInfo() {
    const moreInfo = document.getElementById('moreInfo');
    overlay.addEventListener('click', hideModal);
    moreInfo.addEventListener('click', showModal);
    setMoreInfo();
}

function showModal() {
    modal.classList.add('show-modal')
    overlay.classList.add('show-overlay')
}

function hideModal() {
    modal.classList.toggle('show-modal')
    overlay.classList.toggle('show-overlay')
}

function setMoreInfo() {
    const infoArr = apiInfo.moreInfo;
    infoArr.map(info => {
        const li = document.createElement('li')
        const title = document.createElement('span')
        title.innerHTML = info.title + ': '
        title.classList.add('title')
        const value = document.createElement('span')
        value.innerHTML = info.value
        value.classList.add('value')
        li.append(title)
        li.append(value)
        document.getElementById('moreInfoList').append(li)
    })
}