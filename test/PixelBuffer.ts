import {assert} from 'chai';
import 'mocha';
import {PixelBuffer} from "../src/PixelBuffer";
import {Pixel, PixelArea} from "../src/Pixel";
import {Color} from "../src/Display";

describe('PixelBuffer class', function () {
    const config = {width: 10, height: 20};

    it('should be constructible', function () {
        new PixelBuffer(config);
    });

    let pixel_buffer;
    beforeEach(function () {
        pixel_buffer = new PixelBuffer(config);
    });

    it('should be initialized to black', function () {
        for (const pixel of (new PixelArea(new Pixel(0,0), new Pixel(config.width - 1, config.height - 1))).pixels()) {
            assert.equal(pixel_buffer.get_color(pixel), Color.Black);
        }
    });

    it('should save set colors', function () {
        const pixel = new Pixel(5, 5);
        pixel_buffer.set_color(pixel, Color.White);
        assert.equal(pixel_buffer.get_color(pixel), Color.White);
    });
});