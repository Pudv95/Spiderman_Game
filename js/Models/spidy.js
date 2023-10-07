import {
    spidy_standing,
    leftSteps,
    rightSteps,
    spidy_jumping,
    spidy_shooting,
    spidy_jump_shooting,
    spidy_left_step_shoot,
    spidy_right_step_shoot,
    spidy_change_step_shoot,
    spidy_sliding,
    Lspidy_standing,
    Lspidy_jumping,
    Lspidy_shooting,
    Lspidy_jump_shooting,
    Lspidy_left_step_shoot,
    Lspidy_right_step_shoot,
    Lspidy_change_step_shoot,
    Lspidy_sliding,
} from '../static/images.js'; 

export default class Spidy {
    constructor(context) {
        this.ctx = context;
        this.x = 0;
        this.y = 200;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isShooting = false;
        this.direction = 'right';
        this.images = {
            standing: {
                right: spidy_standing,
                left: Lspidy_standing,
            },
            leftSteps: leftSteps,
            rightSteps: rightSteps,
            jumping: {
                right: spidy_jumping,
                left: Lspidy_jumping,
            },
            shooting: {
                right: spidy_shooting,
                left: Lspidy_shooting,
            },
            jumpShooting: {
                right: spidy_jump_shooting,
                left: Lspidy_jump_shooting,
            },
            leftStepShooting: {
                right: spidy_left_step_shoot,
                left: Lspidy_left_step_shoot,
            },
            rightStepShooting: {
                right: spidy_right_step_shoot,
                left: Lspidy_right_step_shoot,
            },
            changeStepShooting: {
                right: spidy_change_step_shoot,
                left: Lspidy_change_step_shoot,
            },
            sliding: {
                right: spidy_sliding,
                left: Lspidy_sliding,
            },
        };

        this.draw = this.draw.bind(this); 

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                    this.moveRight();
                    break;
                case 'ArrowUp':
                    this.jump();
                    break;
                case ' ':
                    this.shoot();
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.velocityX = 0;
                    break;
            }
        });
    }

    moveLeft() {
        this.velocityX = -3;
        this.direction = 'left';
    }

    moveRight() {
        this.velocityX = 3;
        this.direction = 'right';
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -15;
        }
    }

    shoot() {
        this.isShooting = true;
        this.draw();
        setTimeout(() => {
            this.isShooting = false;
            this.draw();
        }, 150);
    }

    update(base,onBuilding) {
        if(this.x+this.velocityX < 200 && this.x+this.velocityX > 0)
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.y < base || !onBuilding) {
            this.velocityY += 1;
        } else {
            this.y = base;
            this.velocityY = 0;
            this.isJumping = false;
        }

        this.draw();
    }

    draw() {
        let currentImage;

        if (this.isShooting) {
            currentImage = this.images.shooting[this.direction];
        } else if (this.isJumping) {
            currentImage = this.images.jumping[this.direction];
        } else if (this.velocityX > 0) {
            currentImage = this.images.rightSteps[Math.floor(Date.now() / 200) % 3];
        } else if (this.velocityX < 0) {
            currentImage = this.images.leftSteps[Math.floor(Date.now() / 200) % 3];
        } else {
            currentImage = this.images.standing[this.direction];
        }

        this.ctx.drawImage(currentImage, this.x, this.y, 50, 50);
    }
}
