import {PixelAcceptor, Shape} from "./Shape";
import {circle} from 'bresenham-zingl';
import {Pixel} from "../Pixel";
import {Color} from "../Display";

export class Circle implements Shape {

    constructor(private readonly center: Pixel,
                private readonly radius: number,
                private readonly color: Color = Color.White) {
    }

    draw(display: PixelAcceptor): Promise<void> {
        return new Promise(resolve => {
            circle(this.center.x, this.center.y, this.radius, (x, y) => {
                display.draw_pixels([new Pixel(x, y)], this.color);
            });
            resolve();
        })
    }

}