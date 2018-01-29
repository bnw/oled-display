import * as assert from "assert";

export interface PixelInterface {
    x: number;
    y: number;
}

export class Pixel implements PixelInterface {
    constructor(public x: number, public y: number) {
    }

    static from_xy_object(xy_object: PixelInterface) {
        return new Pixel(xy_object.x, xy_object.y);
    }

    public equals(other: PixelInterface) {
        return this.x == other.x && this.y == other.y;
    }

    public to_string() {
        return "(" + this.x + ", " + this.y + ")";
    }

    public translate(pixel: PixelInterface) {
        return new Pixel(this.x + pixel.x, this.y + pixel.y);
    }
}

export class PixelArea {
    constructor(private _min: Pixel | null = null, private _max: Pixel | null = null) {
    }

    public extend(pixel: Pixel) {
        if (null === this._min) {
            assert(null === this._max);
            this._min = new Pixel(pixel.x, pixel.y);
            this._max = new Pixel(pixel.x, pixel.y);
        } else {
            assert(null !== this._max);
            if (pixel.x < this._min.x) {
                this._min.x = pixel.x;
            } else if (pixel.x > this._max.x) {
                this._max.x = pixel.x;
            }
            if (pixel.y < this._min.y) {
                this._min.y = pixel.y;
            } else if (pixel.y > this._max.y) {
                this._max.y = pixel.y;
            }
        }
    }

    get min(): Pixel | any {
        return this._min;
    }

    get max(): Pixel | any {
        return this._max;
    }

    empty() {
        return this._min === null;
    }

    public pixels = function* () {
        if (this.empty()) {
            return;
        }
        let x = this.min.x;
        let y = this.min.y;
        while (y <= this.max.y) {
            yield new Pixel(x, y);
            x++;
            if (x > this.max.x) {
                x = this.min.x;
                y++;
            }
        }
    };
}