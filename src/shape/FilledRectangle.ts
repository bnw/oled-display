import {PixelAcceptor, Shape} from "./Shape";
import {Pixel, PixelArea} from "../Pixel";
import {Color} from "../Display";

export class FilledRectangle implements Shape {

    constructor(private readonly area: PixelArea,
                private readonly color: Color = Color.White) {
    }

    draw(display: PixelAcceptor): Promise<void> {
        return new Promise(resolve => {
            display.draw_pixels(this.area.pixels(), this.color);
            resolve();
        })
    }

}