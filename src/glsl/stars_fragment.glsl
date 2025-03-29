#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_offset;
uniform float   u_time;

#define FBM_OCTAVES 3
#define FBM_AMPLITUDE_SCALAR 0.5
#define FBM_AMPLITUDE_INITIAL 1.0

#include "../../node_modules/lygia/generative/fbm.glsl"


#include "../../node_modules/lygia/generative/random.glsl"

#define STARS_OPACITY 0.6

float round_precision(float value) {
  return floor(value * 10000.0) * 0.0001;
}

void main(void) {
    vec4 color = vec4(0, 0, 0, 0);
    vec2 res_rounded = vec2(round_precision(1.0/u_resolution.x), round_precision(1.0/u_resolution.y));
    vec2 st = vec2(round_precision(gl_FragCoord.x * res_rounded.x), round_precision(gl_FragCoord.y * res_rounded.y));

    // Generate the clumps where stars will be
    float star_density = fbm(vec3(st * 4., u_offset + (u_time * 0.25))) * 0.5 + 0.25;

    // Random noise for clumps
    float general_density_noise = random(vec3(st * 5., (2.0 * u_offset) / 5000.0));

    // Add "stray" stars outside of the noise patterns
    float truly_random_noise = random(vec3(st * 5., (3.0 * u_offset) / 5000.0));

    float adjusted_random_noise = truly_random_noise + ((star_density - 0.25) * 4.0);
    float density_reduction_factor = clamp(star_density * general_density_noise, 0.0, 1.0) * 2.5;

    bool stray = truly_random_noise > 0.99;

    float minimum_brightness = star_density * 0.02 * STARS_OPACITY;
    
    if(general_density_noise >= 0.994) {
        float base = clamp(sin(u_time * 20.0 + gl_FragCoord.x + gl_FragCoord.y) * 2.0 + 2.4, 0.0, 1.0);
        base *= STARS_OPACITY;
        if(!stray) {
            base *= clamp(adjusted_random_noise - density_reduction_factor, 0.0, 1.0);
        } else {
            base *= 0.8;
        }
        // Don't make pixels darker than this
        if(base < minimum_brightness) {
            color = vec4(minimum_brightness, minimum_brightness, minimum_brightness, minimum_brightness);
        }
        color = vec4(base, base, base, base);
    } else {
        color = vec4(minimum_brightness, minimum_brightness, minimum_brightness, minimum_brightness);
    }
    gl_FragColor.rgba = color;
}
