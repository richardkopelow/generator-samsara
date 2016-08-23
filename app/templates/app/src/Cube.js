define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var Transform = require('samsara/core/Transform');
    var Transitionable = require('samsara/core/Transitionable');

    // Define a cube with top, bottom, left, right, front and back sides.
    // The length of the cube is a `Transitionable` which can animate.

    // Note: animating a size is not hardware accelerated, and should be used sparingly
    // it is better to animate the scale with a `Transform` instead
    var Cube = View.extend({
        defaults : {
            length : 200
        },
        initialize: function (options) {
            // Define an animate-able length
            this.length = new Transitionable(options.length);

            // Map the length to the size of each face
            this.size = this.length.map(function(length){
                return [length, length];
            });

            // Add each of the cube's faces
            this.addLeft();
            this.addRight();
            this.addFront();
            this.addBack();
            this.addTop();
            this.addBottom();
        },
        addLeft : function(){
            var left = new Surface({
                content: 'left',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'left']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function(length){
                    return Transform.thenMove(
                        Transform.rotateY(-Math.PI / 2),
                        [-length / 2, 0, 0]
                    )
                })
            }).add(left);
        },
        addRight : function(){
            var right = new Surface({
                content: 'right',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'right']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function (length) {
                    return Transform.thenMove(
                        Transform.rotateY(Math.PI / 2),
                        [length / 2, 0, 0]
                    )
                })
            }).add(right);
        },
        addTop : function(){
            var top = new Surface({
                content: 'top',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'top']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function (length) {
                    return Transform.thenMove(
                        Transform.rotateX(Math.PI / 2),
                        [0, -length / 2, 0]
                    );
                })
            }).add(top);
        },
        addBottom : function(){
            var bottom = new Surface({
                content: 'bottom',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'bottom']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function (length) {
                    return Transform.thenMove(
                        Transform.rotateX(-Math.PI / 2),
                        [0, length / 2, 0]
                    )
                })
            }).add(bottom);
        },
        addFront : function(){
            var front = new Surface({
                content: 'front',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'front']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function (length) {
                    return Transform.translateZ(length / 2);
                })
            }).add(front);
        },
        addBack : function(){
            var back = new Surface({
                content: 'back',
                origin: [.5, .5],
                size: this.size,
                classes: ['face', 'back']
            });

            this.add({
                align: [.5, .5],
                transform: this.length.map(function (length) {
                    return Transform.thenMove(
                        Transform.rotateX(Math.PI),
                        [0, 0, -length / 2]
                    );
                })
            }).add(back);
        }
    });

    module.exports = Cube;
});

