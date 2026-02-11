//document.write("<script>" + "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" + "</script>");

var debug = "";
if (window.location.href.indexOf("debug") > -1) {
   debug = "-debug";
}

document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Core.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Foundation.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Containers.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Grids.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Forms.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_RichTextEditor.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Calendar.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Drawing.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_Charts.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_DataBinding.js?fld_version=v12.1p_2023-10-16.js"></script>');
document.write('<script src="' + isomorphicDir + 'modules' + debug + '/ISC_PluginBridges.js?fld_version=v12.1p_2023-10-16.js"></script>');

document.write('<script src="tools.js?fld_version=140724.js"></script>');
document.write('<script src="resources/js/jquery-3.7.1.min.js"></script>');
document.write('<script src="resources/js/dayjs-1.8.21.min.js"></script>');
document.write('<script src="resources/qz-print/qz-tray-2.1.6.js?fld_version=2207151623.js"></script>');
document.write('<script src="resources/qz-print/qz-fluid-2.1.6.2.js?fld_version=2403181300.js"></script>');
document.write('<script src="resources/js/xlsx.full.min.js?fld_version=2301291309.js"></script>');
document.write('<script src="resources/scandit/browser/index.min.js"></script>');
document.write('<script src="resources/reveal/1.7.5/infragistics.reveal.js"></script>');
document.write('<script src="resources/reveal/fluid.reveal.0.5.js"></script>');

document.write("<script type=\"text/javascript\"> (function() { var walkme = document.createElement('script'); walkme.type = 'text/javascript'; walkme.async = true; walkme.src = 'https://cdn.walkme.com/users/80f6d0d46d924f0caecd65057bc4038a/walkme_80f6d0d46d924f0caecd65057bc4038a_https.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })(); </script>");