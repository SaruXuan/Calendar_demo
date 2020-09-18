<?php include('header.php') ?>
<?php include('data.php') ?>

<div id="calender">
    <div id="header">
        <?= date('Y') ?> / <?= date('m') ?>
    </div>
    <div id="days">
        <?php foreach ($days as $key => $value): ?>
            <div class="day"><?= $value ?></div>
        <?php endforeach ?>
    </div>
    <div id="dates">
        <?php foreach ($dates as $key => $value): ?>
            <div class="date-block <?= (is_null($value)) ? 'empty':'' ?>">
                <div class="date"><?= $value ?></div>
                <div class="event"></div>
            </div>
        <?php endforeach ?>
    </div>
</div>

<div id="info-panel" class="new">
    <div class="close">x</div>
    <div class="title">
        <label>Event</label>
        <div contenteditable="true"></div>
    </div>
    <div class="time-picker">
        <div class="selected-date">
            <span class="month">09</span>/<span class="date">13</span>
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
        <button class="delete">delete</button>
        <!--create: create/cancel-->
        <!--update:-->
    </div>
</div>

<?php include('footer.php') ?>