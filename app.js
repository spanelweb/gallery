const cubeRoom = document.getElementById('cube-room');
const centerWall = document.getElementById('center-wall');
const resetBtn = document.getElementById('reset-bg-btn');
const walls = document.querySelectorAll('.wall-grid');

// Generate Foto Otomatis ke Dinding Samping
walls.forEach((wall) => {
    const wallType = wall.getAttribute('data-wall');
    
    for (let i = 0; i < 12; i++) {
        const imgUrl = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 10000)}`;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.classList.add('photo-item');
        
        // Eksekusi Klik Gambar
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Efek kamera bergerak halus mendekat ke arah dinding yang diklik
            if (wallType === 'left') cubeRoom.style.transform = "rotateY(-15deg) translateZ(80px)";
            if (wallType === 'right') cubeRoom.style.transform = "rotateY(15deg) translateZ(80px)";
            if (wallType === 'top') cubeRoom.style.transform = "rotateX(-10deg) translateZ(80px)";
            if (wallType === 'bottom') cubeRoom.style.transform = "rotateX(10deg) translateZ(80px)";

            // Langsung update background di sekat tengah
            centerWall.style.backgroundImage = `url('${imgUrl}')`;
            centerWall.classList.add('has-bg');
            centerWall.style.borderColor = "#fff";
            resetBtn.style.display = "inline-block";

            // Kamera otomatis reset lurus fokus ke tengah lagi secara smooth
            setTimeout(() => {
                cubeRoom.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
            }, 600);
        });

        wall.appendChild(img);
    }
});

// Tombol Reset Background
resetBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    centerWall.style.backgroundImage = "none";
    centerWall.classList.remove('has-bg');
    centerWall.style.borderColor = "rgba(255, 255, 255, 0.1)";
    resetBtn.style.display = "none";
    cubeRoom.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
});
