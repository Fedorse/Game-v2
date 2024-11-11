import { MapObj } from "./MapObj";
export class MapTree extends MapObj {
    constructor(game, x, y, sprite) {
        const width = 64;
        const height = 96;
        super(game, x, y, width, height, sprite);
        this.isSolid = true;
    }
}