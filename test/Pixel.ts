import {assert} from 'chai';
import 'mocha';
import {Pixel, PixelArea} from "../src/Pixel";

describe('PixelArea class', function () {

    it('should have min,max == null when constructed', function () {
        const pixel_area = new PixelArea();
        assert(null === pixel_area.min);
        assert(null === pixel_area.max);
        assert(pixel_area.empty());
    });

    describe('extend', function () {
        it('should extend to the correct points', function () {
            const pixel_area = new PixelArea();
            pixel_area.extend(new Pixel(13, 5));
            pixel_area.extend(new Pixel(3, 15));
            const expected_min = new Pixel(3, 5);
            const expected_max = new Pixel(13, 15);
            assert.notStrictEqual(expected_min, pixel_area.min);
            assert.notStrictEqual(expected_max, pixel_area.max);
        });
    });

});