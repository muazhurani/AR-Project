AFRAME.registerComponent('mover', {
    schema: {
    },

    init: function () {
      // Do something when component first attached.
      let el = this.el;
        this.animateMove = function(){
            let currPosition = el.getAttribute('position');
            let params = {
                property: 'position',
                to: {
                    x: currPosition.x - 5,
                    y: currPosition.y,
                    z: currPosition.z
                },
                dur: 5000,
                easing: 'easeInOutElastic'
            };
            el.setAttribute('animation', params);
        }
        this.returnMove = function(e) {
            let p = e.detail.returnPoint;
            let params = {
                property: 'position',
                to: {
                    x: p.x,
                    y: p.y + 2,
                    z: p.z
                },
                dur: 5000,
                easing: 'easeInOutQuad'
            };
            el.setAttribute('animation', params);
        }

        this.el.addEventListener('click', this.animateMove);
        this.el.sceneEl.addEventListener('returnSphere', this.returnMove);

    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      this.el.removeEventListener('click', this.animateMove);
      this.el.sceneEl.removeEventListener('returnSphere', this.returnMove);
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
