const { composePlugins, withNx } = require('@nx/webpack');
const { merge } = require('webpack-merge');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  const finalConfig = merge(config, {
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: (program) => ({
                  before: [
                    require('@nestjs/swagger/plugin').before({}, program),
                  ],
                }),
              },
            },
          ],
        },
      ],
    },
  });

  return finalConfig;
});
