$(function () {
    var score = 0,
        scoreShown = 0,
        autoClick = 0,
        clickIncrement = 1,
        autoClickCost = 50,
        powerClickCost = 100,
        playStartDate = new Date();

    function updateScore() {
        var delta = score - scoreShown;

        scoreShown = delta > 10
            ? scoreShown + Math.floor(delta * 0.2)
            : score;

        $('#score').text(scoreShown);
    }

    function updateTimePlayed() {
        var elapsedSeconds = Math.floor((new Date() - playStartDate) / 1000),
            elapsedMinutes = Math.floor(elapsedSeconds / 60),
            elapsedHours = Math.floor(elapsedMinutes / 60),
            elapsedDays = Math.floor(elapsedHours / 24),
            secondsPart = elapsedSeconds % 60,
            minutesPart = elapsedMinutes % 60,
            hoursPart = elapsedHours % 24,
            daysPart = elapsedDays;

        $('#time-played').text(
            daysPart
            + ':'
            + (100 + hoursPart).toString().slice(-2)
            + ':'
            + (100 + minutesPart).toString().slice(-2)
            + ':'
            + (100 + secondsPart).toString().slice(-2)
        );
    }

    function updateScoreRate() {
        var elapsedSeconds = Math.floor((new Date() - playStartDate) / 1000);

        if (elapsedSeconds > 0) {
            $('#score-rate').text((score / elapsedSeconds).toFixed(1));
        }
    }

    function updatePowerups() {
        if (score < autoClickCost) {
            $('#auto-clicker').attr('disabled', 'true');
        } else {
            $('#auto-clicker').removeAttr('disabled');
        }

        if (score < powerClickCost) {
            $('#power-click').attr('disabled', 'true');
        } else {
            $('#power-click').removeAttr('disabled');
        }
    }

    $('#target')
        .mousedown(function () {
            $(this).addClass('depressed');
        })
        .mouseup(function () {
            $(this).removeClass('depressed');
        })
        .click(function () {
            score = score + clickIncrement;
            updatePowerups();
        });

    $('#auto-clicker').click(function () {
        score = score - autoClickCost;
        autoClick = autoClick + 1;
        updatePowerups();
    });

    $('#power-click').click(function () {
        score = score - powerClickCost;
        clickIncrement = clickIncrement * 2;
        updatePowerups();
    });

    function updateAll() {
        updatePowerups();
        updateTimePlayed();
        updateScoreRate();
    }

    window.setInterval(function () {
        score = score + autoClick;
        updateAll();
    }, 1000);

    window.setInterval(updateScore, 20);

    updateAll();
});
