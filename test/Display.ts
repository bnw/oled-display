import {assert} from 'chai';
import 'mocha';
import {Color, Display, DisplayConfiguration} from '../src/Display';
import * as sinon from "sinon";
import {Pixel, PixelArea} from "../src/Pixel";
import {PixelBuffer} from "../src/PixelBuffer";

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

        describe('calls to canvas.draw_pixels', function () {
            const drawn_pixels = [new Pixel(0, 0), new Pixel(3, 60), new Pixel(1, 1)];
            let dirty_area: PixelArea;
            let pixel_colors: PixelBuffer;

            beforeEach(function () {
                display.draw_pixels(drawn_pixels);
                display.flush();
                pixel_colors = canvas_draw_pixels.firstCall.args[0];
                dirty_area = canvas_draw_pixels.firstCall.args[1];
            });

            it('should call canvas.draw_pixels once per flush', function () {
                assert(canvas_draw_pixels.calledOnce, "CanvasFixture.draw_pixels never called");
            });

            it('should flush correct pixels', function () {
                for (const pixel of dirty_area.pixels()) {
                    if (drawn_pixels.some(pixel.equals.bind(pixel))) {
                        assert.equal(pixel_colors.get_color(pixel), Color.White);
                    } else {
                        assert.equal(pixel_colors.get_color(pixel), Color.Black);
                    }
                }
            });

            it('should flush correct area', function () {
                assert.equal(0, dirty_area.min.x);
                assert.equal(3, dirty_area.max.x);
                assert.equal(0, dirty_area.min.y);
                assert.equal(60, dirty_area.max.y);
            });
        });

        it('should flush only once when called twice');

    });
});