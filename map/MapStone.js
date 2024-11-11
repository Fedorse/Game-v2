import { MapObj } from "./MapObj";
export class MapStone extends MapObj {
    constructor(game, x, y, sprite) {
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, sprite);
        this.isSolid = true;
    }
}