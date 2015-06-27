$(function () {
    var score = 0,
        scoreShown = 0,
        autoClick = 0,
        powerClick = 0,
        catLady = 0,
        catFarm = 0,
        autoClickCost = 50,
        powerClickCost = 100,
        catLadyCost = 200,
        catFarmCost = 1000,
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

        if (score < catFarmCost) {
            $('#cat-farm').attr('disabled', 'true');
        } else {
            $('#cat-farm').removeAttr('disabled');
        }

        $('#cat-farm .current').text(catFarm);
        $('#cat-farm .cost').text(catFarmCost);

        if (score < powerClickCost) {
            $('#power-click').attr('disabled', 'true');
        } else {
            $('#power-click').removeAttr('disabled');
        }

        $('#power-click .current').text(powerClick);
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
            score = score + 1 + powerClick;
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

    $('#cat-farm').click(function () {
        score = score - catFarmCost;
        catFarmCost = catFarmCost + 500;
        catFarm = catFarm + 50;
        updatePowerups();
    });

    $('#power-click').click(function () {
        score = score - powerClickCost;
        powerClick = powerClick + 1;
        powerClickCost = powerClickCost + 100;
        updatePowerups();
    });

    function updateAll() {
        updatePowerups();
        updateTimePlayed();
    }

    window.setInterval(function () {
        score = score + autoClick + catLady + catFarm;
        updateAll();
    }, 1000);

    window.setInterval(updateScore, 20);

    updateAll();
});
