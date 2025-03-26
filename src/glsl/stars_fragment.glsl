precision mediump float;

uniform vec2    u_resolution;
uniform float   u_offset;
uniform float   u_time;

#define FBM_OCTAVES 3
#define FBM_AMPLITUDE_SCALAR 0.5
#define FBM_AMPLITUDE_INITIAL 1.0

#include "../../node_modules/lygia/generative/fbm.glsl"


#include "../../node_modules/lygia/generative/random.glsl"

#define STARS_OPACITY 0.75

void main(void) {
    vec4 color = vec4(0, 0, 0, 0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    float star_density_adjusted_noise = random(vec3(st * 5., u_offset / 5000.0));
    float random_noise_2 = random(vec3(st * 5., (2.0 * u_offset) / 5000.0));
    float star_density = fbm(vec3(st * 10., u_offset)) * 0.5 + 0.5;
    star_density_adjusted_noise *= (star_density + 0.1) * 1.0;
    random_noise_2 *= 1.0 + (star_density_adjusted_noise - 0.5) * 0.025;
    if(star_density_adjusted_noise > 0.35 && random_noise_2 > 0.997) {
        float base = clamp(sin(u_time * 20.0 + gl_FragCoord.x + gl_FragCoord.y) * 2.0 + 2.4, 0.0, 1.0);
        base *= STARS_OPACITY;
        color = vec4(base);
    }
    gl_FragColor.rgba = color;
}
