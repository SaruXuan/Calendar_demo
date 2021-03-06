<?php include('header.php') ?>
<?php include('data.php') ?>
<?php include('template.php') ?>

<div id="calender" data-year="<?= date('Y') ?>" data-month="<?= date('n') ?>">
    <div id="header">
        <?= date('Y') ?> / <?= date('n') ?>
    </div>
    <div id="days">
        <?php foreach ($days as $key => $value): ?>
            <div class="day"><?= $value ?></div>
        <?php endforeach ?>
    </div>
    <div id="dates">
        <?php foreach ($dates as $key => $value): ?>
            <div class="date-block <?= (is_null($value)) ? 'empty':'' ?>" data-date="<?= $value ?>">
                <div class="date"><?= $value ?></div>
                <div class="events">
                </div>
            </div>
        <?php endforeach ?>
    </div>
</div>

<div id="info-panel">
    <div class="close">x</div>
    <form>
        <input type="hidden" name="id">
        <div class="title">
            <label>Event</label><br>
            <input type="text" class='event-input' name="title">
        </div>
        <div class="error-msg">
            <div class="alert alert-danger"></div>
        </div>
        <div class="time-picker">
            <div class="selected-date">
                <span class="month"></span>/<span class="date"></span>
                <input type="hidden" name="year">
                <input type="hidden" name="month">
                <input type="hidden" name="date">
                <input type="hidden" name="done">
            </div>
            <div class="from">
                <label for="from">From</label><br>
                <input type="time" name="start_time" id="from">
            </div>
            <div class="to">
                <label for="to">To</label><br>
                <input type="time" name="end_time" id="to">
            </div>  
        </div>
        <div class="description">
            <label for="description">description</label><br>
            <textarea name="description" id="description"></textarea>
        </div>
        <div class="buttons clearfix">
            <button class="create">create</button>
            <button class="update">update</button>
            <button class="cancel">cancel</button>
            <button class="done">done</button>
            <button class="delete">delete</button>
        </div>
    </form>
</div>


<?php include('footer.php') ?>