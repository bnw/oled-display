import {PixelAcceptor, Shape} from "./Shape";
import {Pixel, PixelArea, PixelInterface} from "../Pixel";
import {Color} from "../Display";

export class FilledRectangle implements Shape {

    constructor(min: PixelInterface, max: PixelInterface, private readonly color: Color = Color.White) {
        this.area = new PixelArea(Pixel.from_xy_object(min), Pixel.from_xy_object(max));
    }

    draw(display: PixelAcceptor): Promise<void> {
        return new Promise(resolve => {
            display.draw_pixels(this.area.pixels(), this.color);
            resolve();
        })
    }

    private readonly area: PixelArea;

}