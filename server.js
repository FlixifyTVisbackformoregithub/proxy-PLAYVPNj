const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
    target: 'http://example.com', // Default target; can be overridden by the query parameter
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Remove `/proxy` from the target URL
    },
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
