precision mediump float;

uniform vec2    u_resolution;
uniform float   u_offset;
uniform float   u_time;

#include "../../node_modules/lygia/generative/pnoise.glsl"

void main(void) {
    vec4 color = vec4(0.0353, 0.0118, 0.0863, 1);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    float d3 = pnoise(vec3(st * 1000.0 + u_offset, 1), vec3(1000.0, 1000.0, 1000.0)) * 0.5 + 0.5;
    if(d3 > 0.87) {
        float base = clamp(sin(u_time * 20.0 + gl_FragCoord.x + gl_FragCoord.y) + 1.25, 0.0, 1.0);
        color = vec4(base);
    }
    gl_FragColor.rgba = color;
}
