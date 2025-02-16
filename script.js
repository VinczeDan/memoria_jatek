document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const counterDisplay = document.getElementById("counter");
    let firstPick = null;
    let secondPick = null;
    let lockBoard = false;
    let moves = 0;

    // Betűk generálása (kétszer minden betű)
    const letters = "ABCDEFGHIJKL".split("");
    const gameLetters = [...letters, ...letters];
    
    // Betűk keverése
    gameLetters.sort(() => Math.random() - 0.5);

    // Játéktábla létrehozása
    gameLetters.forEach((letter, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.letter = letter;
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });

    function handleCellClick(event) {
        if (lockBoard) return;

        const clickedCell = event.target;
        
        if (clickedCell.classList.contains("revealed") || clickedCell.classList.contains("matched")) {
            return;
        }

        clickedCell.textContent = clickedCell.dataset.letter;
        clickedCell.classList.add("revealed");

        if (!firstPick) {
            firstPick = clickedCell;
        } else if (!secondPick) {
            secondPick = clickedCell;
            lockBoard = true;
            moves++;
            counterDisplay.textContent = `Kattintások: ${moves}`;

            // Ellenőrzés, hogy egyeznek-e
            if (firstPick.dataset.letter === secondPick.dataset.letter) {
                firstPick.classList.add("matched");
                secondPick.classList.add("matched");
                checkWin();
                resetPicks();
            } else {
                setTimeout(() => {
                    firstPick.textContent = "";
                    secondPick.textContent = "";
                    firstPick.classList.remove("revealed");
                    secondPick.classList.remove("revealed");
                    resetPicks();
                }, 1000);
            }
        }
    }

    function resetPicks() {
        firstPick = null;
        secondPick = null;
        lockBoard = false;
    }

    function checkWin() {
        const matchedCells = document.querySelectorAll(".matched");
        if (matchedCells.length === gameLetters.length) {
            setTimeout(() => {
                alert(`Gratulálok! Nyertél! Kattintások száma: ${moves}`);
                resetGame();
            }, 500);
        }
    }

    function resetGame() {
        board.innerHTML = "";
        moves = 0;
        counterDisplay.textContent = `Kattintások: ${moves}`;
        gameLetters.sort(() => Math.random() - 0.5);
        gameLetters.forEach((letter, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.letter = letter;
            cell.dataset.index = index;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        });
    }
});