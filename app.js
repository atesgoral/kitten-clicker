$(function () {
    var score = 0,
        scoreShown = 0,
        autoClick = 0,
        clickIncrement = 1,
        catLady = 0,
        autoClickCost = 50,
        powerClickCost = 100,
        catLadyCost = 200,
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
            $('#auto-click').attr('disabled', 'true');
        } else {
            $('#auto-click').removeAttr('disabled');
        }

        $('#auto-click .current').text(autoClick);
        $('#auto-click .cost').text(autoClickCost);

        if (score < catLadyCost) {
            $('#cat-lady').attr('disabled', 'true');
        } else {
            $('#cat-lady').removeAttr('disabled');
        }

        $('#cat-lady .current').text(catLady);
        $('#cat-lady .cost').text(catLadyCost);

        if (score < powerClickCost) {
            $('#power-click').attr('disabled', 'true');
        } else {
            $('#power-click').removeAttr('disabled');
        }

        $('#power-click .current').text(clickIncrement);
        $('#power-click .cost').text(powerClickCost);
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

    $('#auto-click').click(function () {
        score = score - autoClickCost;
        autoClickCost = autoClickCost + 10;
        autoClick = autoClick + 1;
        updatePowerups();
    });

    $('#cat-lady').click(function () {
        score = score - catLadyCost;
        catLadyCost = catLadyCost + 50;
        catLady = catLady + 5;
        updatePowerups();
    });

    $('#power-click').click(function () {
        score = score - powerClickCost;
        clickIncrement = clickIncrement + 1;
        powerClickCost = powerClickCost + 100;
        updatePowerups();
    });

    function updateAll() {
        updatePowerups();
        updateTimePlayed();
        updateScoreRate();
    }

    window.setInterval(function () {
        score = score + autoClick + catLady;
        updateAll();
    }, 1000);

    window.setInterval(updateScore, 20);

    updateAll();
});
