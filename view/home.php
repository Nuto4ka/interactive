<!-- Main jumbotron for a primary marketing message or call to action -->

    <div class="row">
      <div class="col-md-8">
        <div class="circle blink"></div>
        <div id="understandChart"></div>
      </div>
      <div class="col-md-4">
        <div id="agreeChart"></div>
      </div>
    </div>


<div class="main-content">
  <!-- Example row of columns -->
  <div class="row">
    <div class="col-md-6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><strong>The level of understanding</strong></h3>
        </div>
        <div class="panel-body">
          <p>Please select the level of understanding</p>
          <!-- <label for="level1">I understand on:</label>
          <input type="text" id="level1" readonly style="width: 23px; border:0; color:#f6931f; font-weight:bold;">%
          <div id="slider-vertical"></div> -->
          <div id="vertical-radio">
            <div class="for-labels">
              <label for="radio1">1</label>
              <label for="radio2">2</label>
              <label for="radio3">3</label>
              <label for="radio4">4</label>
              <label for="radio4">5</label>
            </div>
            <div class="for-radios">
              <input type="radio" name="radio" value="1" id="radio1"/>
              <input type="radio" name="radio" value="2" id="radio2"/>
              <input type="radio" name="radio" value="3" id="radio3"/>
              <input type="radio" checked="checked" value="4" name="radio" id="radio4"/>
              <input type="radio" name="radio" value="5" id="radio5"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-md-4">
      <div class="panel panel-success">
        <div class="panel-heading">
          <h3 class="panel-title"><strong>The level of interest</strong></h3>
        </div>
        <div class="panel-body">
          <p>If you are interested in the report of the select level of interest.</p>
          <label for="level3">I interested on:</label>
          <input type="text" id="level3" readonly style="width: 23px; border:0; color:#f6931f; font-weight:bold;">%
          <div id="interest-slider"></div>
        </div>
      </div>
    </div> -->
    <div class="col-md-6">
      <div class="panel panel-warning">
        <div class="panel-heading">
          <h3 class="panel-title"><strong>The level of agreement</strong></h3>
        </div>
        <div class="panel-body">
          <p>Are you agree with the speaker?</p>
          <p>
            <div class="onoffswitch">
              <form class="" action="index.html" method="post">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
                <label class="onoffswitch-label" id="checkboxAgree" for="myonoffswitch"></label>
              </form>
            </div>
          </p>
        </div>
      </div>
    </div>
  </div>
  <input type="hidden" name="level2" id="level2" value="10">
  <input type="hidden" name="level3" id="level3" value="10">
  <hr>
  <footer>
    <p>&copy; 2016 Company, Inc.</p>
  </footer>
</div> <!-- /container -->
