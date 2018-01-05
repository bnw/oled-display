import {assert} from 'chai';
import 'mocha';
import {Display, DisplayConfiguration} from '../src/Display';
import * as sinon from "sinon";
import {Pixel} from "../src/Pixel";

describe('Display class', () => {
    let display_configuration: DisplayConfiguration;
    let canvas_draw_pixels;

    beforeEach(function () {
        const resolved_promies = new Promise<void>(resolve => resolve());
        canvas_draw_pixels = sinon.stub().returns(resolved_promies);
        display_configuration = {
            width: 128,
            height: 64,
            canvas: {
                draw_pixels: canvas_draw_pixels
            }
        };
    });

    it('should be constructible', () => {
        new Display(display_configuration);
    });

    let display: Display;
    beforeEach(function () {
        display = new Display(display_configuration);
    });

    describe('draw_pixels', function () {
        it('should return self', () => {
            const result = display.draw_pixels([]);
            assert.equal(result, display);
        });

        it('should not trigger draw on canvas', () => {
            display.draw_pixels([new Pixel(1, 2)]);
            assert(canvas_draw_pixels.notCalled);
        });
    });

    describe('flush', function () {
        it('should not draw pixels if flush is called when nothing was drawn', () => {
            display.flush();
            assert(canvas_draw_pixels.notCalled);
        });

        it('should flush correct pixels and area', function () {
            const pixels = [new Pixel(0, 0), new Pixel(3, 60), new Pixel(1, 1)];
            display.draw_pixels(pixels);
            display.flush();

            assert(canvas_draw_pixels.calledOnce, "CanvasFixture.draw_pixels never called");

            const dirty_area = canvas_draw_pixels.firstCall.args[1];
            assert.equal(0, dirty_area.min.x);
            assert.equal(3, dirty_area.max.x);
            assert.equal(0, dirty_area.min.y);
            assert.equal(60, dirty_area.max.y);

            const pixel_colors = canvas_draw_pixels.firstCall.args[0];
            for (let i = 0; i < display_configuration.width * display_configuration.height; i++) {
                const expected_pixels = [
                    display_configuration.width * 0 + 0,
                    display_configuration.width * 1 + 1,
                    display_configuration.width * 60 + 3
                ];
                const pixel_value = pixel_colors.get(i);
                if (expected_pixels.indexOf(i) != -1) {
                    assert.equal(pixel_value, true, "Pixel " + i + " wrongfully inactive");
                } else {
                    assert.equal(pixel_value, false, "Pixel " + i + " wrongfully active");
                }
            }
        });

    });
});