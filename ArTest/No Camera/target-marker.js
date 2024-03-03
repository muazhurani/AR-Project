AFRAME.registerComponent('target-marker', {
    schema: {
        
    },

    init: function () {
        let el = this.el;

        this.addMarker = function(e) {
            let p = e.detail.intersection.point;
            let scene = document.querySelector('a-scene');

            let newMark = document.createElement('a-entity');
            newMark.setAttribute('geometry', {
                primitive: 'sphere'
            })
            newMark.setAttribute('material', 'color: red');
            newMark.setAttribute('scale', '.2 .2 .2');
            newMark.setAttribute('position', el.object3D.worldToLocal(p));
            el.appendChild(newMark);
        }

        this.el.addEventListener('click', this.addMarker);
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
      this.el.removeEventlistener('click', this.addMarker);
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
