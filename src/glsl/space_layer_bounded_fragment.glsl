#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform float   u_offset;
uniform vec2    u_resolution;
uniform float   u_time;
uniform vec4    u_color;
uniform vec2    u_position;
uniform float   u_size;
uniform float   u_detail;

#define FBM_OCTAVES 5
#define FBM_AMPLITUDE_SCALAR 0.25
#define FBM_AMPLITUDE_INITIAL 1.0

#include "../../node_modules/lygia/space/scale.glsl"
#include "../../node_modules/lygia/generative/fbm.glsl"

void main(void) {
    vec4 color = u_color;
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel * u_detail;

    vec2 dist = u_position.xy - gl_FragCoord.xy;
    dist *= dist;

    float d1 = clamp(fbm(vec3(st.x + u_offset / 500.0, st.y + u_offset / 500.0, u_time)) * 3.0 + 2.0, 0.1, 5.0);
    float d2 = clamp(fbm(vec3(st.x + u_offset / 500.0, st.y + 100.0 + u_offset / 1000.0, u_time)) * 3.0 + 2.0, 0.1, 5.0);
    dist *= vec2(d1, d2);
    
    float calculatedAlpha = clamp(1.0 - ((dist.x + dist.y) * pixel.x) / u_size, 0.0, 1.0);
    // we can skip perlin generation for this entire coordinate! :)
    if (calculatedAlpha < 0.01) {
        gl_FragColor.rgba = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    float d3 = fbm(vec3(st.x + u_offset / 500.0, st.y, u_time)) * 0.5 + 0.5;

    color -= vec4(vec3(d3), 0);

    gl_FragColor.rgba = color;

    gl_FragColor.a *= calculatedAlpha;

    // premultiply alpha
    gl_FragColor.rgb *= clamp(gl_FragColor.a * 1.75, 0.0, 1.0);
}
