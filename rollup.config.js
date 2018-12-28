import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'esm', sourcemap: true }
		],
		plugins: [
      resolve({preferBuiltins: false}), // so Rollup can find `ms`
      typescript(/*{ plugin options }*/),
		],
		external: Object.keys(pkg.dependencies)
	}
];