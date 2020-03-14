const onPlayClick = () => {
    const player = document.getElementById("player");
    let isPlaying = !player.paused || player.currentTime;
    document.getElementById("alert").innerText = "";
    if (isPlaying) {
        player.pause();
    } else {
        player.src = "http://firmanty.com:8000/radio";
        player.volume = 1.0;
        player.play().catch(e => {
            isPlaying = false;
            document.getElementById("alert").innerText =
                "It looks like nobody is playing, try again later.";
            player.pause();
            document.getElementById("play-button").innerText = "Play";
        });
    }
    document.getElementById("play-button").innerText = isPlaying
        ? "Play"
        : "Pause";
};

const getStatus = () => {
    console.log("fetching status");
    let status = "";
    fetch("http://firmanty.com:8000/status-json.xsl")
        .then(r => r.json())
        .then(j => {
            //console.log("STATUS:", j);
            const info = document.getElementById("info");
            status = j && j.icestats && j.icestats.source;
            if (status) {
                info.innerText = `Currently playing: ${
                    status.title ? status.title : "Salon Odsłuchowy"
                }`;
                document.getElementById("alert").innerText = "";
            } else {
                info.innerText = "Currently no-one is playing :(";
            }
        })
        .catch(e => {
            console.error(e);
            const info = document.getElementById("info");
            info.innerText = "Currently no-one is playing :(";
        });
};

const onChatToggleClick = () => {
    const chat = document.getElementById("chat");
    const chatToggle = document.getElementById("chat-toggle");
    if (chat.classList.contains("hidden")) {
        chat.classList.remove("hidden");
        chatToggle.innerText = "HIDE CHAT";
    } else {
        chat.classList.add("hidden");
        chatToggle.innerText = "OPEN CHAT";
    }
};
