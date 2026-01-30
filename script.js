const songLyric = "https://taylor-swift-api.sarbo.workers.dev/lyrics/";
const songTitle = "https://taylor-swift-api.sarbo.workers.dev/songs"
const ytMusicapiKey = "AIzaSyCNH7j0GHLrV1wch4H_mi5Q1IKA6qatpwI";

async function ytMusic (query){
        let res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=Taylor+Swift+${encodeURIComponent(query)}&key=${ytMusicapiKey}&type=video&maxResults=1&videoEmbeddable=true`);
        let data = await res.json();

        console.log(data);

        if(data.items && data.items.length>0){
                let songID = data.items[0].id.videoId;

                return `https://www.youtube.com/embed/${songID}`;
        }
        else{
                return null;
        }
}

// ytMusic("red");


async function storMusic (){
     let response = await fetch(songTitle);
     let title = await response.json();
     let playingSong = title.slice(0,20);
     
     console.log(playingSong);

    playingSong.forEach(song => {
        let newP = document.createElement("p");
        newP.innerHTML = `🎵${song.title}`;
        newP.style.cursor = "pointer";

        document.querySelector(".list-container").appendChild(newP);

        newP.addEventListener("click",async()=>{
                let res = await fetch(`${songLyric}${song.song_id}`);
                let data = await res.json();

                console.log(data);

                document.querySelector(".song-container").innerHTML = "";
                document.querySelector(".song-container").innerHTML = data.lyrics.replace(/\n/g , "<br>");

                const playVideo = await ytMusic (song.title);

                if(playVideo){
                        document.querySelector(".video").innerHTML = `
                        <iframe
                         width="100%"
                         height="100%"
                         src="${playVideo}"
                         frameborder="0"
                         allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                         allowFullScreen
                        ></iframe>`
                }
                else{
                        document.querySelector(".video").innerHTML = `<p style="padding: 2rem;">🎥 No music video found</p>`;
                }
        })
        
     });

}

storMusic();

