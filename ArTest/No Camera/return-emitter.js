AFRAME.registerComponent('return-emitter', {
    schema: {
        
    },

    init: function () {
        let el = this.el
        this.returnCall = function() {
            let p = el.getAttribute('position');
            el.emit('returnSphere', {returnPoint: p});
        }
        this.el.addEventListener('click', this.returnCall);
      // Do something when component first attached.
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
        this.el.removeEventListener('click', this.returnCall);
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
