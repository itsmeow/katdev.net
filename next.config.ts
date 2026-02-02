import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    trailingSlash: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
            '*.glsl': {
                loaders: ['@davcri/webpack-glsl-loader', 'raw-loader'],
                as: '*.cjs',
            },
        },
    },
}

export default nextConfig
