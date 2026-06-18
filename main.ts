//% color=#FF00FF weight=100 icon="\uf1e2" blockGap=8
namespace geometrydash {

    let playerSprite: Sprite = null;
    let currentMode = 0;
    let yVelocity = 0;
    let gravityDirection = 1;

    /**
     * Create the Geometry Dash player
     */
    //% block="create gd player at x %x y %y"
    //% x.defl=30 y.defl=60 blockGap=8
    export function createGDPlayer(x: number, y: number) {
        playerSprite = sprites.create(img`
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
        `, SpriteKind.Player);
        playerSprite.setPosition(x, y);
    }

    /**
     * Get the player sprite
     */
    //% block="gd player"
    export function gdPlayer(): Sprite {
        return playerSprite;
    }

    //% block="set gd mode to %mode"
    //% mode.defl=0
    export function setGDMode(mode: number) {
        currentMode = mode;
    }

    //% block="enable gd controls"
    export function enableGDControls() {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!playerSprite) return;
            if (currentMode === 0) { // Cube
                if (playerSprite.isHittingTile(CollisionDirection.Bottom)) {
                    yVelocity = -12 * gravityDirection;
                }
            }
        });
    }

    //% block="update gd physics"
    export function updateGDPhysics() {
        if (!playerSprite) return;

        yVelocity += 0.8 * gravityDirection;
        playerSprite.y += yVelocity;
        playerSprite.x += 2; // auto-run

        // Keep player in bounds
        if (playerSprite.y > 110) {
            playerSprite.y = 110;
            yVelocity = 0;
        }
        if (playerSprite.y < 10) {
            playerSprite.y = 10;
            yVelocity = 0;
        }
    }
}
