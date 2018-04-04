module.exports = `<!DOCTYPE html>
<html lang="cn">

<head>
  <meta charset="utf-8">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <meta name="theme-color" content="#f60">
    <% for (var i in htmlWebpackPlugin.options.css) { %>
        <link  href="<%= htmlWebpackPlugin.options.css[i] %>?version=<%= htmlWebpackPlugin.options.version%>"  rel="stylesheet">
    <% } %>
    <script src="<%=  htmlWebpackPlugin.options.dll %>"></script>
</head>

<body>
  <div id="app"></div>
    <% for (var k in htmlWebpackPlugin.options.js) { %>
        <script type="text/javascript"  src="/js/<%= k %>.js?version=<%= htmlWebpackPlugin.options.version%>"></script>
    <% } %>
    
</body>
</html>`