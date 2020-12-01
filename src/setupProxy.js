const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  
    app.use(
      proxy('/search', {
        target: 'http://localhost:8004',
        pathRewrite(path) { return path.replace('/search', ''); }
      })
    );

    app.use(
      proxy('/assetsServer', {
        target: 'http://devwebassets.intranet.mckinsey.com',
        pathRewrite(path) { return path.replace('/assetsServer', ''); }
      })
    );

    app.use(
      proxy('/personprofile', {
        target: 'https://home.intranet.mckinsey.com',
        pathRewrite(path) { return path.replace('/assetsServer', ''); }
      })
    );
     app.use(
      proxy('/assetsSubmission', {
        target: 'http://localhost:8080',
        pathRewrite(path) { return path.replace('/assetsSubmission', ''); }
      })
    );



    app.use(
      proxy('/EXTERNAL__ASSETS', {
        target: 'http://localhost',
        pathRewrite(path) { return path.replace('/EXTERNAL__ASSETS', ''); }
      })
    );

    app.use(
      proxy('/profilesLink', {
        target: 'http://devhome.intranet.mckinsey.com/profilesint',
        pathRewrite(path) { return path.replace('/profilesLink', ''); }
      })
    );
    /*app.use(
      proxy('/know', {
        target: 'https://devhome.intranet.mckinsey.com',
        pathRewrite(path) { return path.replace('/know', ''); }
      })
    );*/
    app.use(
      proxy('/banner-widget', {
        //for local
        target: 'http://localhost:8082'
      })
    );

    app.use(
      proxy('/assetSummaryApi', {
        target: 'https://devhome.intranet.mckinsey.com/ksassetbe/summary/asset?id=2000',
        pathRewrite(path) { return path.replace('/assetSummaryApi', ''); }
      })
    );


    app.use(
      proxy('/engagementsApi', {
        target: 'https://devhome.intranet.mckinsey.com/ksassetbe/getEngagements?departmentCode=204',
        pathRewrite(path) { return path.replace('/engagementsApi', ''); }
      })
    );
  };