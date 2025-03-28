precision mediump float;

uniform float   u_offset;
uniform vec2    u_resolution;
uniform float   u_time;
uniform vec4    u_color;
uniform float   u_detail;

// Set 5 octaves for anything generated
#define FBM_OCTAVES 5
#define FBM_AMPLITUDE_SCALAR 0.5
#define FBM_AMPLITUDE_INITIAL 1.0

#include "../../node_modules/lygia/generative/fbm.glsl"

void main(void) {
    vec4 color = u_color;
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel * u_detail;
    float d3 = fbm(vec3(st.x + u_offset / 500.0, st.y, u_time)) * 0.5 + 0.5;

    color -= vec4(vec3(d3), 0);

    gl_FragColor.rgba = color;
    // premultiply alpha, but not all the way, because it's boring otherwise
    gl_FragColor.rgb *= clamp(gl_FragColor.a * 1.75, 0.0, 1.0);
}
