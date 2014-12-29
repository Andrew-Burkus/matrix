(function() {
    window.matrix = {};

    matrix.init = function() {
        var self = this;

        this.canvas = document.getElementById('canvas');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.animId = null;
        this.colors = ['#000', '#fff'];
        this.squares = []; // for testing

        this.canvas.onclick = function(e) {
            var square = new matrix.Square(
                e.layerX, e.layerY, 40, self.ctx
            );
            square.render();
            self.squares.push(square);
        };

        this.animate();
    };

    (function(matrix) {
        matrix.render = function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            //TODO: add actual funtionality
            for(var i = 0; i < this.squares.length; i += 1) {
                this.squares[i].render();
            }
        };

        matrix.animate = function() {
            var self = this;
            this.render();
            this.animId = requestAnimationFrame(function() {
                self.animate();
            });
        };

        matrix.play = function() {
            var self = this;
            if(!this.animId) {
                this.animId = requestAnimationFrame(function() {
                    self.animate();
                });
            }
        };

        matrix.pause = function() {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        };

    }(window.matrix));

    (function(matrix) {
        matrix.Square = function(x, y, dim, ctx) {
            this.x = x;
            this.y = y;
            this.dim = dim;
            this.ctx = ctx;
            this.adjust = 0;
        };

        matrix.Square.prototype.render = function() {
            this.ctx.beginPath();
            this.ctx.rect(
                this.x, this.y, this.dim, this.dim
            );

            this.ctx.save();

            this.ctx.fillStyle = this.getColor();
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.restore();
        };

        matrix.Square.prototype.flip = function() {
            if(this.adjust === 1) {
                this.adjust -= 1;
            } else {
                this.adjust += 1;
            }
        };

        matrix.Square.prototype.getColor = function() {
            return matrix.colors[this.adjust];
        };
    }(window.matrix));

    (function(matrix) {
        matrix.Lane = function() {

        };
    }(window.matrix));

})();
