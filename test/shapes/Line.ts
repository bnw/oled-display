import {assert} from 'chai';
import 'mocha';
import * as sinon from "sinon";
import {Line} from "../../src/shape/Line";
import {Pixel} from "../../src/Pixel";
import {Color, Colors} from "../../src/Display";

describe('Line class', function () {

    Colors.forEach(color => {
        let line, pixel_acceptor;
        beforeEach(function () {
            line = new Line(new Pixel(0, 0), new Pixel(2, 2), color);
            pixel_acceptor = {
                draw_pixels: sinon.spy()
            };
            line.draw(pixel_acceptor);
        });

        it('should draw the correct pixels', function () {
            assert.equal(pixel_acceptor.draw_pixels.callCount, 3);
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(0, 0)]));
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(1, 1)]));
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(2, 2)]));
        });

        it('should draw in the correct color', function () {
            assert(pixel_acceptor.draw_pixels.alwaysCalledWith(sinon.match.any, color));
        });
    });

});