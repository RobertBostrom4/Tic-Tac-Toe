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
