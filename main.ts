/**
 * Geometry Dash Extension
 * Cube / Ship / Ball / UFO etc. mechanics + tiles
 */
//% color=#FF00FF weight=100 icon="\uf1e2"
namespace geometrydash {

    export enum GameMode {
        //% block="cube"
        Cube,
        //% block="ship"
        Ship,
        //% block="ball"
        Ball,
        //% block="ufo"
        UFO,
        //% block="wave"
        Wave,
        //% block="robot"
        Robot,
        //% block="spider"
        Spider
    }

    export enum TileKind {
        //% block="ground"
        Ground = 1,
        //% block="spike"
        Spike = 2,
        //% block="gravity portal"
        GravityPortal = 3,
        //% block="cube portal"
        CubePortal = 4,
        //% block="orb"
        Orb = 5
    }

    let mode = GameMode.Cube;
    let playerSprite: Sprite = null;
    let yVelocity = 0;
    let gravDir = 1; // 1 = down, -1 = up

    /**
     * Create the player (cube by default)
     */
    //% block="create gd player at x %x y %y"
    export function createGDPlayer(x: number, y: number): Sprite {
        playerSprite = sprites.create(img`
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
            22222222
        `, SpriteKind.Player); // Replace with better cube/ship sprites later
        playerSprite.setPosition(x, y);
        playerSprite.setFlag(SpriteFlag.StayInScreen, false);
        return playerSprite;
    }

    /**
     * Change gamemode (affects controls/physics)
     */
    //% block="set gd mode to %m"
    export function setMode(m: GameMode) {
        mode = m;
        // TODO: swap player image for different modes
    }

    /**
     * Handle input (A button = jump / fly / click)
     */
    //% block="enable gd controls"
    export function enableControls() {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!playerSprite) return;

            if (mode === GameMode.Cube && playerSprite.isHittingTile(CollisionDirection.Bottom)) {
                yVelocity = -12 * gravDir;
            } else if (mode === GameMode.Ship || mode === GameMode.UFO) {
                yVelocity = -5 * gravDir; // continuous thrust
            } else if (mode === GameMode.Ball) {
                // flip gravity or rotation
                gravDir *= -1;
            }
            // Add more modes...
        });
    }

    /**
     * Update physics (call every frame in game loop)
     */
    //% block="update gd physics"
    export function updatePhysics() {
        if (!playerSprite) return;

        yVelocity += 0.8 * gravDir; // gravity
        playerSprite.y += yVelocity;

        // Simple floor/ceiling
        if (playerSprite.y > 110) {
            playerSprite.y = 110;
            yVelocity = 0;
        }
        if (playerSprite.y < 10) {
            playerSprite.y = 10;
            yVelocity = 0;
        }

        // Auto-run (typical GD feel)
        playerSprite.x += 2; // constant speed
    }

    /**
     * Setup a basic GD level with scrolling + tilemap
     */
    //% block="setup gd level"
    export function setupLevel() {
        scene.setBackgroundColor(0x111111);
        // Example tilemap (use editor to design better ones)
        scene.setTileMap(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `);
        scene.setTile(1, img`1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1`, true); // ground
        // Add spikes with scene.setTile(2, spikeImg, true) etc.
    }

    /**
     * Place a special GD tile (spike, portal, etc.)
     */
    //% block="place gd tile %kind at col %col row %row"
    export function placeTile(kind: TileKind, col: number, row: number) {
        // Implement with scene.setTileAt or custom collision
        if (kind === TileKind.Spike) {
            // deadly tile
        }
    }
}
