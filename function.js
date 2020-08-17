var dot = document.getElementById('dot');
    /*-----------------------------
            movements
    -------------------------------*/
      var x = 500;
      var y = 500;
      var pad = 1.00;
    /*-----------------------------
             player object
    ------------------------------*/
      var player = {
        location: function(y, x) {
          dot.style.top = y + 'px';
          dot.style.left = x + 'px';
          let m = Math.floor;
          dot.textContent = [m(x), m(y)];
          //bumpGrave()
        },
        move: function(ySpeed, xSpeed) {
          x += xSpeed;
          y += ySpeed;
          player.location(y, x);

        },
        size: function(shrink) {dot.style.padding = (pad += shrink) + '%'},
      };

    /*-----------------------------
               follower
    ------------------------------*/

    var enemy = document.getElementById('enemy');
    var enemyX = 1000;
    var enemyY = 500;
    var enemySpeed = 1;
    enemy.style.padding = pad + '%';
    enemy.style.left = enemyX + 'px';
    enemy.style.top = enemyY + 'px';

    var follow = function() {
      var distance, distX, distY;

      if (enemyY > y) {
        enemy.style.top = (enemyY -= enemySpeed) + 'px';
        distY = enemyY - y;
      } else {
        enemy.style.top = (enemyY += enemySpeed) + 'px';
        distY = y - enemyY;
      }
      if (enemyX > x) {
        enemy.style.left = (enemyX -= enemySpeed) + 'px';
        distX = enemyX - x;
      } else {
        enemy.style.left = (enemyX += enemySpeed) + 'px';
        distX = x - enemyX;
      }

      distance = distX + distY
      if (distance < 1) {
        player.size(-.01)
        cancelAnimationFrame(follow);
      }
      requestAnimationFrame(follow);
    }

    /*-----------------------------
              boundaries
    ------------------------------*/

      var heightRanges = function() {
        var heightRange = [];
        let start1 = 176;
        let end1 = 261;
        let start2 = 350;
        let end2 = 435;
        let start3 = 515;
        let end3 = 618;
      }

      var widthRange = function() {
        var widthRange = [];
        let start = 503;
        let end = 825;
        while (start <= end) {widthRange.push(start); start++};
        return widthRange;
      }
      var bump = function(arr) {
        
      }


      var dirt = document.getElementById('dirt');
      var graver = function() {
        for (let x = 0; x < 9; x++) {
          var $grave = $('<div class="grave" >r.i.p.</div>');
          $grave.appendTo(dirt);
        }
      }
    /*-----------------------------
              movements
    ------------------------------*/
      var direction = [];
      const up = 87;
      const down = 83;
      const right = 68;
      const left = 65;

      var starter;

      window.onkeydown = window.onkeyup = function(e) {
        direction[e.keyCode] = e.type === 'keydown';
        requestAnimationFrame(function(timeStamp) {
          timeStamp = 1000;
          direct(timeStamp);
        });
      }
      var startTime = new Date().getTime();
      var direct = function(timeStamp) {
        var currentTime = new Date().getTime();
        var speed = (240 / (currentTime - startTime)) + .005;
        if (direction[up] && direction[right]) {
          player.move(-speed, speed)
        } else if (direction[up] && direction[left]) {
          player.move(-speed, -speed);
        } else if (direction[down] && direction[right]) {
          player.move(speed, speed);
        } else if (direction[down] && direction[left]) {
          player.move(speed, -speed);
        } else if (direction[up]) {
          player.move(-speed, 0);
        } else if (direction[down]) {
          player.move(speed, 0);
        } else if (direction[left]) {
          player.move(0, -speed);
        } else if (direction[right]) {
          player.move(0, speed);
        }


        requestAnimationFrame(function(timeStamp) {
          timeStamp = 1000;
          direct(timeStamp);
        });
        // dot.textContent = [speed, timeStamp];
      }
    /*-----------------------------------
              starting / refresh
    ------------------------------------*/
      window.onload = function() {
      dot.style.top = y + 'px';
      dot.style.left = x + 'px';
      dot.style.padding = pad + '%';
      bump();
      follow();
      graver();
      }