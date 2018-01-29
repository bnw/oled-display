import {PixelAcceptor, Shape} from "./Shape";
import {line} from 'bresenham-zingl';
import {Pixel, PixelInterface} from "../Pixel";
import {Color} from "../Display";

export class Line implements Shape {

    constructor(
        private readonly from: PixelInterface,
        private readonly to: PixelInterface,
        private readonly color: Color = Color.White
    ) {
    }

    draw(display: PixelAcceptor): Promise<void> {
        return new Promise(resolve => {
            line(this.from.x, this.from.y, this.to.x, this.to.y, (x, y) => {
                display.draw_pixels([new Pixel(x, y)], this.color);
            });
            resolve();
        })
    }

}