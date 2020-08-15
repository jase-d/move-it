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
      }
      requestAnimationFrame(follow);
    }

    /*-----------------------------
              boundaries
    ------------------------------*/

    // if ((x < 7 && y < 20)) {
        //   player.move(speed, speed)
        //   player.size(-.010)
        // }
      var dirt = document.getElementById('dirt');
      var graver = function() {

        var $grave = $('<div id="grave" >r.i.p.</div>');
        

        grave.appendTo(dirt);
      }
    /*-----------------------------
              movements
    ------------------------------*/
      var direction = {};
      const up = 87;
      const down = 83;
      const right = 68;
      const left = 65;
      const speed = .05;

      window.onkeydown = window.onkeyup = function(e) {
        direction[e.keyCode] = e.type === 'keydown';
        direct()
      }

      var direct = function() {
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
        window.requestAnimationFrame(direct)
      }
    /*-----------------------------------
              starting / refresh
    ------------------------------------*/
      window.onload = function() {
      dot.style.top = y + 'px';
      dot.style.left = x + 'px';
      dot.style.padding = pad + '%';
      graver();
      }