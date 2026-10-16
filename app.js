const STORAGE_KEY = "yt-planner-videos";

const form = document.getElementById("content-form");
const titleInput = document.getElementById("video-title");
const descriptionInput = document.getElementById("video-description");
const list = document.getElementById("planned-content");
const clearButton = document.getElementById("clear-content");

let videos = loadVideos();

function loadVideos() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveVideos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

function renderVideos() {
    list.innerHTML = "";

    if (videos.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No videos planned yet.";
        list.appendChild(empty);
        return;
    }

    videos.forEach((video) => {
        const item = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = video.title;

        const description = document.createElement("p");
        description.textContent = video.description;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            videos = videos.filter((v) => v.id !== video.id);
            saveVideos();
            renderVideos();
        });

        item.append(title, description, removeButton);
        list.appendChild(item);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !description) return;

    videos.push({ id: Date.now(), title, description });
    saveVideos();
    renderVideos();

    form.reset();
    titleInput.focus();
});

clearButton.addEventListener("click", () => {
    if (videos.length === 0 || !confirm("Remove all planned videos?")) return;
    videos = [];
    saveVideos();
    renderVideos();
});

renderVideos();
