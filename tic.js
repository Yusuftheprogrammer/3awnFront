const items = document.querySelectorAll(".item");
const title = document.querySelector(".playerTitle");
const rematch = document.querySelector(".rematch");

let gameOver = false;


items.forEach(item => {
    item.addEventListener("click", () => {
        if (item.classList.contains("playerX") || item.classList.contains("playerO") || gameOver) return;

        item.classList.add("playerX");

        if (winCheck("playerX")) {
            title.textContent = "اللاعب (X) فاز!";
            gameOver = true;
            rematch.style.display = "inline-block";
            return;
        }


        aiMove();
    });
});


rematch.addEventListener("click", () => {
    items.forEach(item => item.className = "item");
    title.textContent = "اكس اوه";
    gameOver = false;
    rematch.style.display = "none";
});


function winCheck(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index =>
            items[index].classList.contains(player)
        )
    );
}


function aiMove() {
    if (gameOver) return;

    const emptyItems = Array.from(items).filter(item => 
        !item.classList.contains("playerX") && !item.classList.contains("playerO")
    );

    if (emptyItems.length === 0){
      title.textContent = "تعادل!";
      gameOver = true;
      rematch.style.display = "inline-block";
      return;
    };

    const randomItem = emptyItems[Math.floor(Math.random() * emptyItems.length)];
    randomItem.classList.add("playerO");

    if (winCheck("playerO")) {
        title.textContent = "اللاعب (O) فاز!";
        gameOver = true;
        rematch.style.display = "inline-block";
    }
}
