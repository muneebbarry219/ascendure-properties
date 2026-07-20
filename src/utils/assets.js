const assetContext = require.context('../assets', false, /\.(png|jpe?g|webp|svg)$/);

const bundledAssets = assetContext.keys().reduce((assets, key) => {
  assets[key.replace('./', '')] = assetContext(key);
  return assets;
}, {});

export const resolveAssetUrl = (path) => {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const assetName = path.replace(/^\/?assets\//, '');
  return bundledAssets[assetName] || path;
};
