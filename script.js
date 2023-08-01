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

