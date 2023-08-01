const gameBoard = (function () {

    const gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];


    const getGameBoard = () => gameBoard;

    return {
        getGameBoard
    };

})();

const player = (function (mark) {

    let isPlaying = true;

    const noLongerPlaying = () => isPlaying = false;

    const playing = () => isPlaying = true;

    const getPlayingStatus = () => isPlaying;

    const getMark = () => mark;

    const move = (spotOnGameBoard) => {

        if (isPlaying) {

            if (spotOnGameBoard.textContent == "") {
                spotOnGameBoard.textContent = mark;
            }
        }

    }

    return {
        getMark,
        move,
        noLongerPlaying,
        playing,
        getPlayingStatus
    }

});


const computer = (function (mark) {
    const { getMark, getPlayingStatus, noLongerPlaying, playing } = new player(mark);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function move(gameBoardSection) {

        if (getPlayingStatus()) {

            let i = getRandomInt(9);

            if (gameBoardSection.children[i].textContent == "") {

                gameBoardSection.children[i].textContent = getMark();
                let classChars = gameBoardSection.children[i].className.split(" ");
                let row = parseInt(classChars[1]);
                let column = parseInt(classChars[3]);


                gameBoard.getGameBoard()[row][column] = getMark();


            } else {
                i = getRandomInt(9);
                move(gameBoardSection);
            }


        }
    }
    return { getMark, getPlayingStatus, move, playing, noLongerPlaying };
});

const displayController = (function () {

    let gameBoardSection = document.querySelector(".gameboard-section");
    let headerSection = document.querySelector(".header-section");
    let person;
    let artificialPerson;
    let reset = document.querySelector(".reset-button");

    const renderGameBoard = () => {

        reset.addEventListener("click", (event) => {

            person.playing();
            artificialPerson.playing();

            for (i = 0; i < gameBoard.getGameBoard().length; i++) {
                for (j = 0; j < gameBoard.getGameBoard()[i].length; j++) {
                    gameBoard.getGameBoard()[i][j] = "";
                }
            }

            for (let section of gameBoardSection.children) {
                section.textContent = "";
            }


        });

        for (let button of headerSection.children) {
            button.addEventListener("click", (event) => {
                person = new player(button.textContent);

                if (person.getMark() == "X") {
                    artificialPerson = new computer("O");
                } else {
                    artificialPerson = new computer("X");
                }

                reset.click();
            });
        }

        for (i = 0; i < gameBoard.getGameBoard().length; i++) {
            for (j = 0; j < gameBoard.getGameBoard()[i].length; j++) {

                let spotOnGameBoard = document.createElement("button");
                spotOnGameBoard.className = "row- " + i + " -col- " + j;

                let classChars = spotOnGameBoard.className.split(" ");
                let row = parseInt(classChars[1]);
                let column = parseInt(classChars[3]);

                if (column == 0) {
                    spotOnGameBoard.style.borderLeftStyle = "none";
                } else if (column == 2) {
                    spotOnGameBoard.style.borderRightStyle = "none";
                }

                spotOnGameBoard.addEventListener("click", (event) => {

                    person.move(spotOnGameBoard);
                    gameBoard.getGameBoard()[row][column] = person.getMark();


                    //Add ai moves here using pseudorandom numbers
                    artificialPerson.move(gameBoardSection);

                    const diagOne = [gameBoard.getGameBoard()[0][2], gameBoard.getGameBoard()[1][1], gameBoard.getGameBoard()[2][0]];
                    const diagTwo = [gameBoard.getGameBoard()[0][0], gameBoard.getGameBoard()[1][1], gameBoard.getGameBoard()[2][2]];
                    const colOne = [gameBoard.getGameBoard()[0][0], gameBoard.getGameBoard()[1][0], gameBoard.getGameBoard()[2][0]];
                    const colTwo = [gameBoard.getGameBoard()[0][1], gameBoard.getGameBoard()[1][1], gameBoard.getGameBoard()[2][1]];
                    const colThree = [gameBoard.getGameBoard()[0][2], gameBoard.getGameBoard()[1][2], gameBoard.getGameBoard()[2][2]];


                    const isMatchingPlayerMark = (currentvalue) => currentvalue == person.getMark();
                    const isMatchingComputerMark = (currentvalue) => currentvalue == artificialPerson.getMark();

                    if (gameBoard.getGameBoard()[row].every(isMatchingPlayerMark) || diagOne.every(isMatchingPlayerMark) || diagTwo.every(isMatchingPlayerMark) || colOne.every(isMatchingPlayerMark) || colTwo.every(isMatchingPlayerMark) || colThree.every(isMatchingPlayerMark)) {
                        alert("You win!");
                        person.noLongerPlaying();
                        artificialPerson.noLongerPlaying();
                    } else if (gameBoard.getGameBoard()[row].every(isMatchingComputerMark) || diagOne.every(isMatchingComputerMark) || diagTwo.every(isMatchingComputerMark) || colOne.every(isMatchingComputerMark) || colTwo.every(isMatchingComputerMark) || colThree.every(isMatchingComputerMark)) {
                        alert("You lose!");
                        person.noLongerPlaying();
                        artificialPerson.noLongerPlaying();
                    }

                });

                gameBoardSection.appendChild(spotOnGameBoard);
            }

        }
    }

    gameBoardSection
    return {
        renderGameBoard
    };

})();

displayController.renderGameBoard();



