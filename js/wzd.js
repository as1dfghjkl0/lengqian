var RENDERER = {
        INIT_CHERRY_BLOSSOM_COUNT: 30,
        MAX_ADDING_INTERVAL: 10,

        init: function() {
          this.setParameters();
          this.reconstructMethods();
          this.createCherries();
          this.render();
          if (
            navigator.userAgent.match(
              /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
          ) {
            var box = document.querySelectorAll('.box')[0];
            console.log(box, '移动端');
            box.style.marginTop = '65%';
          }
        },
        setParameters: function() {
          this.$container = $('#jsi-cherry-container');
          this.width = this.$container.width();
          this.height = this.$container.height();
          this.context = $('<canvas />')
            .attr({ width: this.width, height: this.height })
            .appendTo(this.$container)
            .get(0)
            .getContext('2d');
          this.cherries = [];
          this.maxAddingInterval = Math.round(
            (this.MAX_ADDING_INTERVAL * 1000) / this.width
          );
          this.addingInterval = this.maxAddingInterval;
        },
        reconstructMethods: function() {
          this.render = this.render.bind(this);
        },
        createCherries: function() {
          for (
            var i = 0,
              length = Math.round(
                (this.INIT_CHERRY_BLOSSOM_COUNT * this.width) / 1000
              );
            i < length;
            i++
          ) {
            this.cherries.push(new CHERRY_BLOSSOM(this, true));
          }
        },
        render: function() {
          requestAnimationFrame(this.render);
          this.context.clearRect(0, 0, this.width, this.height);

          this.cherries.sort(function(cherry1, cherry2) {
            return cherry1.z - cherry2.z;
          });
          for (var i = this.cherries.length - 1; i >= 0; i--) {
            if (!this.cherries[i].render(this.context)) {
              this.cherries.splice(i, 1);
            }
          }
          if (--this.addingInterval == 0) {
            this.addingInterval = this.maxAddingInterval;
            this.cherries.push(new CHERRY_BLOSSOM(this, false));
          }
        }
      };
      var CHERRY_BLOSSOM = function(renderer, isRandom) {
        this.renderer = renderer;
        this.init(isRandom);
      };
