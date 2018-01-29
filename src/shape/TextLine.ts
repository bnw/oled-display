import {PixelAcceptor, Shape} from "./Shape";
import {Pixel} from "../Pixel";
import {Letter} from "./Letter";
import {Color} from "../Display";

export class TextLine implements Shape {

    constructor(private readonly text: string, private readonly position: Pixel = new Pixel(0, 0), private readonly color : Color = Color.White) {
    }

    draw(display: PixelAcceptor): Promise<any> {
        const spacing = Letter.letter_width() + 1;

        const letters = this.text.split("");
        const promises = letters.map((letter, index) => {
            const letter_position = new Pixel(this.position.x + index * spacing, this.position.y);
            const letter_shape = new Letter(letter, letter_position, this.color);
            return letter_shape.draw(display);
        });

        return Promise.all(promises);
    }

    width(): number {
        return 5 * this.text.length + (this.text.length - 1);
    }
}