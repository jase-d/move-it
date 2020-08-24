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
          bump(x, y);
          dot.style.top = y + 'px';
          dot.style.left = x + 'px';

          let m = Math.floor;
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
      // will pass in arguments as [x,y];
      var heightRanges = function(heights = [[176, 261], [350, 435], [515, 618]]) {
        let heightRange = [];

        for (let x = 0; x < heights.length; x++) {
          let height = heights[x];
          let range = [];
          for (let i = height[0]; i <= height[1]; i++) {
            range.push(i);
          }
          heightRange.push(range);
        }
        return heightRange;
      }
      var iterateHeight = function(heights, y) {
        for (let x = 0; x < heights.length; x++) {
          let height = heights[x];
          for (let i = 0; i < height.length; i++) {
            if (height[i] === y) {
              return true;
            }
          }
        }
        return false;
      };

      var widthRange = function() {
        let widthR = [];
        let start = 503;
        let end = 825;
        while (start <= end) {widthR.push(start); start++};
        return widthR;
      }
      //will pass the coordinates as (x, y)
      var bump = function(x, y) {

        let width = widthRange();
        var heights = heightRanges();

               if ((x > 565 && x < 810) && ((y > 200 && y < 250) || (y > 375 && y < 400) || (y > 540 && y < 600))) {
          player.move(-5, 0);
        } else if ((x > 565 && x < 810) && ((y > 250 && y < 261) || (y > 400 && y < 444) || (y > 600 && y < 618))) {
          player.move(5, 0);
         }else if ((x > 558 && x < 565) && ((y > 210 && y < 261) || (y > 385 && y < 444) || (y > 550 && y < 618))) {
          player.move(0, -5);
        } else if ((x > 820 && x < 825) && ((y > 210 && y < 261) || (y > 385 && y < 444) || (y > 550 && y < 618))) {
          player.move(0, 5);
        }
      }


      var dirt = document.getElementById('dirt');
      var graver = function() {
        for (let x = 0; x < 9; x++) {
          var $grave = $('<div class="grave" >r.i.p.</div>');
          var $shadow = $('<div class="shadow" ></div>')
          $grave.appendTo(dirt);
          $shadow.appendTo($grave);
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
        var speed = (240 / (currentTime - startTime)) + .010;
        if (direction[up] && direction[right]) {
          player.move(-speed, speed)
        } else if (direction[up] && direction[left]) {
          player.move(-speed, -speed);
        } else if (direction[down] && direction[right]) {
          player.move(speed, speed);
        } else if (direction[down] && direction[left]) {
          player.move(speed, -speed);
        } else if (direction[up]) {
          debugger;
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

      graver();
      follow();
      }