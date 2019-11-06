const files = require.context('./', false, /\.svg$/);
files.keys().forEach(files);
